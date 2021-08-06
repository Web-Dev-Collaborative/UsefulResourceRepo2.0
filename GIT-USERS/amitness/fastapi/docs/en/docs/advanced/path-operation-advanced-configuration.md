# Path Operation Advanced Configuration

## OpenAPI operationId

!!! warning
If you are not an "expert" in OpenAPI, you probably don't need this.

You can set the OpenAPI `operationId` to be used in your _path operation_ with the parameter `operation_id`.

You would have to make sure that it is unique for each operation.

```Python hl_lines="6"
{!../../../docs_src/path_operation_advanced_configuration/tutorial001.py!}
```

### Using the _path operation function_ name as the operationId

If you want to use your APIs' function names as `operationId`s, you can iterate over all of them and override each _path operation's_ `operation_id` using their `APIRoute.name`.

You should do it after adding all your _path operations_.

```Python hl_lines="2  12-21  24"
{!../../../docs_src/path_operation_advanced_configuration/tutorial002.py!}
```

!!! tip
If you manually call `app.openapi()`, you should update the `operationId`s before that.

!!! warning
If you do this, you have to make sure each one of your _path operation functions_ has a unique name.

    Even if they are in different modules (Python files).

## Exclude from OpenAPI

To exclude a _path operation_ from the generated OpenAPI schema (and thus, from the automatic documentation systems), use the parameter `include_in_schema` and set it to `False`;

```Python hl_lines="6"
{!../../../docs_src/path_operation_advanced_configuration/tutorial003.py!}
```

## Advanced description from docstring

You can limit the lines used from the docstring of a _path operation function_ for OpenAPI.

Adding an `\f` (an escaped "form feed" character) causes **FastAPI** to truncate the output used for OpenAPI at this point.

It won't show up in the documentation, but other tools (such as Sphinx) will be able to use the rest.

```Python hl_lines="19-29"
{!../../../docs_src/path_operation_advanced_configuration/tutorial004.py!}
```
