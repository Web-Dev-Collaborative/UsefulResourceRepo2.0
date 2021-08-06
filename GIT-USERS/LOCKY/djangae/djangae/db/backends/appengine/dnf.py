from itertools import  product
from django.db.models.sql.where import Constraint
from commands import parse_constraint, OPERATORS_MAP
from django.db.models.sql.datastructures import EmptyResultSet
from djangae.db.backends.appengine.dbapi import NotSupportedError

from google.appengine.api import datastore


IMPOSSIBLE_FILTER = ('__key__', '<', datastore.Key.from_path('', 1))

def process_literal(node, filtered_columns=[], negated=False):
    column, op, value = node[1]
    if filtered_columns is not None:
        assert isinstance(filtered_columns, set)
        filtered_columns.add(column)
    if op == 'in':  # Explode INs into OR
        if not isinstance(value, (list, tuple, set)):
            raise ValueError("IN queries must be supplied a list of values")
        if negated:
            lits = []
            for x in value:
                lits.append(('LIT', (column, '>', x)))
                lits.append(('LIT', (column, '<', x)))
            return ('OR', lits), filtered_columns
        else:
            if not value:
                # Add an impossible filter when someone queries on an empty list, which should never return anything for
                # this branch. We can't just raise an EmptyResultSet because another branch might return something
                return ('AND', [('LIT', IMPOSSIBLE_FILTER)]), filtered_columns
            return ('OR', [('LIT', (column, '=', x)) for x in value]), filtered_columns
    elif op == "isnull":
        op = "exact"
        value = None

    if not OPERATORS_MAP.get(op):
        raise NotSupportedError("Unsupported operator %s" % op)
    _op = OPERATORS_MAP[op]

    if negated and _op == '=':  # Explode
        return ('OR', [('LIT', (column, '>', value)), ('LIT', (column, '<', value))]), filtered_columns
    return ('LIT', (column, _op, value)), filtered_columns


def process_node(node, connection, negated=False):
    if isinstance(node, tuple) and isinstance(node[0], Constraint):
        return ('LIT', parse_constraint(node, connection, negated)), negated
    if isinstance(node, tuple):
        return node, negated
    if node.connector == 'AND' or 'OR':
        if node.negated:
            negated = True
        return (node.connector, [child for child in node.children]), negated


def parse_dnf(node, connection):
    tree, filtered_columns = parse_tree(node, connection)
    if tree:
        tree = tripled(tree)


    if tree and tree[0] != 'OR':
        tree = ('OR', [tree])


    # Filter out impossible branches of the where, if that then results in an empty tree then
    # raise an EmptyResultSet, otherwise replace the tree with the now simpler query
    if tree:
        final = []
        for and_branch in tree[-1]:
            if and_branch[0] == 'LIT' and and_branch[-1] == IMPOSSIBLE_FILTER:
                continue
            elif and_branch[0] == 'AND' and IMPOSSIBLE_FILTER in [x[-1] for x in and_branch[-1] ]:
                continue

            final.append(and_branch)
        if not final:
            raise EmptyResultSet()
        else:
            tree = (tree[0], final)

    # If there are more than 30 filters, and not all filters are PK filters
    if tree and len(tree[-1]) > 30:
        for and_branch in tree[-1]:
            if and_branch[0] == 'LIT':
                and_branch = [and_branch]
            for lit in and_branch[-1] if and_branch[0] == 'AND' else and_branch:  # Go through each literal tuple
                if isinstance(lit[-1], datastore.Key) or isinstance(lit[-1][-1], datastore.Key):  # If the value is a key, then break the loop
                    break
            else:
                # If we didn't find a literal with a datastore Key, then raise unsupported
                raise NotSupportedError("The datastore doesn't support this query, more than 30 filters were needed")

    return tree, filtered_columns


def parse_tree(node, connection, filtered_columns=None, negated=False):
    """
        Takes a django tree and parses all the nodes returning a new
        tree in the correct format for expansion
    """
    filtered_columns = filtered_columns or set()

    node, negated = process_node(node, connection, negated=negated)

    if node[0] in ['AND', 'OR']:
        new_children = []
        for child in node[1]:
            parsed_node, _columns = parse_tree(child, connection, filtered_columns, negated)
            if parsed_node:
                new_children.append(parsed_node)

            for col in _columns:
                filtered_columns.add(col)

        if not new_children:
            return None, filtered_columns

        if len(new_children) == 1:
            return new_children[0], filtered_columns
        return (node[0], new_children), filtered_columns
    if node[0] == 'LIT':
        parsed_lit, _columns = process_literal(node, filtered_columns=filtered_columns, negated=negated)

        for col in _columns:
            filtered_columns.add(col)
        return parsed_lit, filtered_columns


def tripled(node):
    """
        Applies DNF to a parsed tree
    """
    if node[0] == 'LIT':
        return node
    elif node[0] == 'AND':
        new_children = []
        is_reduction = False
        for child in node[1]:
            if child[0] == 'AND':
                # There is a reduction
                is_reduction = True
                for x in child[1]:
                    # append directly
                    new_children.append(x)
            else:
                new_children.append(child)
        if is_reduction:
            return tripled(('AND', new_children))
        else:
            is_or = False
            children = []
            for child in new_children:
                children.append(tripled(child))
            product_pipe = []
            for child in children:
                # It is known at this point that none of these children can be
                # AND nodes because they would have been reduced previously
                if child[0] == 'OR':
                    is_or = True
                    lits = []
                    for x in child[1]:
                        if x[0] == 'LIT':
                            lits.append(x)
                        else:
                            lits.append(x[1])
                    product_pipe.append(lits)
                elif child[0] == 'LIT':
                    product_pipe.append([child])
            if is_or == False:
                # If there are only literals then there is nothing we can do
                return 'AND', children
            else:
                # If there is an OR then we can do crazy product
                def flatten(container):
                    """
                        Only flattens nested lists and ignores tuples
                    """
                    for i in container:
                        if isinstance(i, list):
                            for j in flatten(i):
                                yield j
                        else:
                            yield i
                return 'OR', [('AND', list(flatten(x))) for x in product(*product_pipe)]
    elif node[0] == 'OR':
        children = []
        for child in node[1]:
            _proc = tripled(child)
            if _proc[0] == 'OR':
                for child in _proc[1]:
                    children.append(child)
            else:
                children.append(_proc)
        return 'OR', children
