```
from nbformat.v4 import new_notebook, new_code_cell, new_markdown_cell

import nbformat

nb = new_notebook()

nb.cells = [
    new_code_cell('print("hello")'),
    new_markdown_cell('# Cool')
]

nbformat.write(nb, 'test.ipynb')
```