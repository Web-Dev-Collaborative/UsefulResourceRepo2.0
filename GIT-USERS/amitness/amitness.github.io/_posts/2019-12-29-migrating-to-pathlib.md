---
title: "Migrating from OS.PATH to PATHLIB Module in Python"
date: 2019-12-29T23:28:30-04:00
categories:
  - python
classes: wide
excerpt: Learn how to use the modern pathlib module to perform tasks you have been using os.path for.
---

In this article, I will go over the most frequent tasks related to file paths and show how you can refactor the old approach of using [os.path](https://docs.python.org/3/library/os.path.html) module to the new cleaner way using [pathlib](https://docs.python.org/3/library/pathlib.html) module.

## Joining paths

```python
import os
base_path = '/home/ubuntu/'
filename = 'data.csv'
os.path.join(base_path, filename)
```

In pathlib, we can use the division operator to separate the paths elegantly.

```python
from pathlib import Path
base_path = '/home/ubuntu/'
filename = 'data.csv'
Path(base_path) / filename
```

## Get absolute path

```python
import os
os.path.abspath(__file__)
```

```python
from pathlib import Path
Path(__file__).resolve()
```

## Get current working directory

```python
import os
os.getcwd()
```

```python
from pathlib import Path
Path.cwd()
```

## Check if path is a file

```python
import os
os.path.isfile('/home/ubuntu/data.csv')
```

```python
from pathlib import Path
Path('/home/ubuntu/data.csv').is_file()
```

## Check if path is a directory

```python
import os
os.path.isdir('/home/ubuntu/')
```

```python
from pathlib import Path
Path('/home/ubuntu/').is_dir()
```

## Check if a path exists

```python
import os
os.path.exists('/home/ubuntu/')
```

```python
from pathlib import Path
Path('/home/ubuntu/').exists()
```

## Get path to folder containing a file

```python
import os
os.path.dirname('/home/ubuntu/data.csv')
# /home/ubuntu
```

```python
from pathlib import Path
Path('/home/ubuntu/data.csv').parent
# /home/ubuntu
```

## Get the path to the home directory

```python
import os
os.path.expanduser('~')
```

```python
from pathlib import Path
Path.home()
```

## Expand the user home directory in a path

```python
import os
os.path.expanduser('~/Desktop')
# '/home/ubuntu/Desktop'
```

```python
from pathlib import Path
Path('~/Desktop').expanduser()
```

## Get size in bytes of a file

```python
import os
os.path.getsize('/home/ubuntu/data.csv')
```

```python
from pathlib import Path
Path('/home/ubuntu/data.csv').stat().st_size
```

## Get file extension

```python
import os
path, ext = os.path.splitext('/home/ubuntu/hello.py')
# ('/home/ubuntu/hello', '.py')
```

```python
from pathlib import Path
Path('/home/ubuntu/hello.py').suffix
# .py
```

## Change permission of a file

```python
import os
os.chmod('key.pem', 0o400)
```

```python
from pathlib import Path
Path('key.pem').chmod(0o400)
```

## Get file name without directory

```python
import os
os.path.basename('/home/ubuntu/hello.py')
# hello.py
```

```python
from pathlib import Path
Path('/home/ubuntu/hello.py').name
# hello.py
```

## List contents of a directory

```python
import os
os.listdir()
```

```python
from pathlib import Path
Path().iterdir()
```

## Create a directory

```python
import os
os.makedirs('/home/ubuntu/data', exist_ok=True)
```

```python
from pathlib import Path
Path('/home/ubuntu/data').mkdir(exist_ok=True)
```

## Rename files or directories

```python
import os
os.rename('rows.csv', 'data.csv')
```

```python
from pathlib import Path
Path('rows.csv').rename('data.csv')
```

## Delete a directory

```python
import os
os.rmdir('/home/ubuntu/test')
```

```python
from pathlib import Path
Path('/home/ubuntu/test').rmdir()
```

## Reading a file

```python
import os
p = os.path.join('/home/ubuntu', 'data.csv')

with open(p) as fp:
    data = fp.read()
```

In new versions of python, you can directly pass a pathlib `Path` to the `open()` function.

```python
from pathlib import Path
path = Path('/home/ubuntu/') / 'data.csv'

with open(path) as fp:
    data = fp.read()
```

In older versions, you can either convert the path to a string using `str()` or use the `open()` method.

```python
from pathlib import Path
path = Path('/home/ubuntu/data.csv')

# Method: 1
data = path.open().read()

# Method 2
with open(str(path)) as fp:
    data = fp.read()

# Method 3
data = path.read_text()
```
