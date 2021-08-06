In your tests/__init__.py file, add the following

```python
from model_mommy import mommy

def generator_function():
    return {}


mommy.generators.add('django_mysql.models.JSONField', generator_function)
```