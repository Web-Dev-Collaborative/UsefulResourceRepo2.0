---
title: "The Python Magic Behind PyTorch"
date: 2020-03-23T10:00:30-04:00
categories:
  - python
  - pytorch
classes: wide
excerpt: Learn about the advanced python native features behind PyTorch
header:
  og_image: /images/python-behind-pytorch.png
  teaser: /images/python-behind-pytorch.png
---

PyTorch has emerged as one of the go-to deep learning frameworks in recent years. This popularity can be attributed to its easy to use API and it being more "pythonic".

![Python and PyTorch combined Logo](/images/python-behind-pytorch.png){: .align-center}

PyTorch leverages numerous native features of Python to give us a consistent and clean API. In this article, I will explain those native features in detail. Learning these will help you better understand why you do things a certain way in PyTorch and make better use of what it has to offer.

## Magic Methods in Layers

Layers such as `nn.Linear()` are some of the basic constructs in PyTorch that we use to build our models. You import the layer and apply them to tensors.

```python
import torch
import torch.nn as nn

x = torch.rand(1, 784)
layer = nn.Linear(784, 10)
output = layer(x)
```

Here we are able to call layer on some tensor `x`, so it must be a function right? Is `nn.Linear()` returning a function? Let's verify it by checking the type.

```python
>>> type(layer)
<class 'torch.nn.modules.linear.Linear'>
```

Surprise! `nn.Linear` is actually a class and layer an object of that class.

> "What! How could we call it then? Aren't only functions supposed to be callable?"

Nope, we can create callable objects as well. Python provides a native way to make objects created from classes callable by using magic functions.
Let's see a simple example of a class that doubles a number.

```python
class Double(object):
    def __call__(self, x):
        return 2*x
```

Here we add a magic method `__call__` in the class to double any number passed to it. Now, you can create an object out of this class and call it on some number.

```python
>>> d = Double()
>>> d(2)
4
```

Alternatively, the above code can be combined in the single line itself.

```python
>>> Double()(2)
4
```

This works because everything in Python is an object. See an example of a function below that doubles a number.

```python
def double(x):
    return 2*x

>>> double(2)
4
```

Even functions invoke the`__call__` method behind the scenes.

```python
>>> double.__call__(2)
4
```

## Magic methods in Forward Pass

Let's see an example of a model that applies a single fully connected layer to MNIST images to get 10 outputs.

```python
import torch.nn as nn

class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 10)

    def forward(self, x):
        return self.fc1(x)
```

The following code should be familiar to you. We are computing output of this model on some tensor x.

```python
x = torch.rand(10, 784)
model = Model()
output = model(x)
```

We know calling the model directly on some tensor executes the `.forward()` function on it. How does that work?

It's the same reason in previous example. We're inheriting the class `nn.Module`. Internally, `nn.Module` has a `__call__()` magic method that calls the `.forward()`. So, when we override `.forward()` method later, it's executed.

```python
# nn.Module
class Module(object):
    def __call__(self, x):
        # Simplified
        # Actual implementation has validation and gradient tracking.
        return self.forward(x)
```

Thus, we were able to call the model directly on tensors.

```python
output = model(x)
# model.__call__(x)
#   -> model.forward(x)
```

## Magic methods in Dataset

In PyTorch, it is common to create a custom class inheriting from the `Dataset` class to prepare our training and test datasets. Have you ever wondered why we define methods with obscure names like `__len__` and `__getitem__` in it?

```python
from torch.utils.data import Dataset

class Numbers(Dataset):
    def __init__(self, x, y):
        self.data = x
        self.labels = y

    def __len__(self):
        return len(self.data)

    def __getitem__(self, i):
        return (self.data[i], self.labels[i])

>>> dataset = Numbers([1, 2, 3], [0, 1, 0])
>>> print(len(dataset))
3
>>> print(dataset[0])
(1, 0)
```

These methods are builtin magic methods of Python. You know how we can get the length of iterables like list and tuples using `len` function.

```python
>>> x = [10, 20, 30]
>>> len(x)
3
```

Python allows defining a `__len__` on our custom class so that `len()` works on it. For example,

```python
class Data(object):
    def __len__(self):
        return 10

>>> d = Data()
>>> len(d)
10
```

Similarly, you know how we can access elements of list and tuples using index notation.

```python
>>> x = [10, 20, 30]
>>> x[0]
10
```

Python allows a `__getitem__` magic method to allow such functionality for custom classes. For example,

```python
class Data(object):
    def __init__(self):
        self.x = [10, 20, 30]

    def __getitem__(self, i):
        return x[i]

>>> d = Data()
>>> d[0]
10
```

With the above concept, now you can easily understand the builtin dataset like MNIST and what you can do with them.

```python
from torchvision.datasets import MNIST

>>> trainset = MNIST(root='mnist', download=True, train=True)
>>> print(len(trainset))
60000
>>> print(trainset[0])
(<PIL.Image.Image image mode=L size=28x28 at 0x7F06DC654128>, 0)
```

## Magic methods in DataLoader

Let's create a dataloader for a training dataset of MNIST digits.

```python
from torchvision.datasets import MNIST
from torch.utils.data import DataLoader
import torchvision.transforms as transforms

trainset = MNIST(root='mnist',
                 download=True,
                 train=True,
                 transform=transforms.ToTensor())
trainloader = DataLoader(trainset, batch_size=32, shuffle=True)
```

Now, let's try accessing first batch from the data loader directly without looping. If we try to access it via index, we get an exception.

```python
>>> trainloader[0]
TypeError: 'DataLoader' object does not support indexing
```

You might have been used to doing it in this way.

```python
images, labels =  next(iter(trainloader))
```

Have you ever wondered why do we wrap trainloader by `iter()` and then call `next()`? Let's demystify this.

Consider a list `x` with 3 elements. In Python, we can create an iterator out of `x` using the `iter` function.

```python
x = [1, 2, 3]
y = iter(x)
```

Iterators are used because they allow lazy loading such that only one element is loaded in memory at a time.

```python
>>> next(x)
1
>>> next(x)
2
>>> next(x)
3
>>> next(x)
StopIteration:
```

We get each element and when we reach the end of the list, we get a `StopIteration` exception.

This pattern matches our usual machine learning workflow where we take small batches of data at a time in memory and do the forward and backward pass. So, `DataLoader` also incorporates this pattern in PyTorch.

To create iterators out of classes in Python, we need to define magic methods `__iter__` and `__next__`

```python
class ExampleLoader(object):
    def __init__(self, data):
        self.data = iter(data)

    def __iter__(self):
        return self

    def __next__(self):
        return next(self.data)

>>> l = ExampleLoader([1, 2, 3])
>>> next(iter(l))
1
```

Here, the `iter()` function calls the `__iter__` magic method of the class returning that same object. Then, the `next()` function calls the `__next__` magic method of the class to return next element present in our data.

In PyTorch, the implementation of DataLoader implements this pattern as follows:

```python
class DataLoader(object):
    def __iter__(self):
        if self.num_workers == 0:
            return _SingleProcessDataLoaderIter(self)
        else:
            return _MultiProcessingDataLoaderIter(self)

class _SingleProcessDataLoaderIter(_BaseDataLoaderIter):
    def __next__(self):
        # logic to return batch from whole data
        ...
```

So, they decouple the iterator creation part and the actual data loading part.

- When you call `iter()` on the data loader, it checks if we are using single or multiple workers
- Based on that, it returns another iterator class for either single or multiple worker

```python
>>> type(iter(trainloader))
torch.utils.data.dataloader._SingleProcessDataLoaderIter
```

- That iterator class has a `__next__` method defined which returns the actual data of set `batch_size` when we call `next()` on it

```python
images, labels =  next(iter(trainloader))

# equivalent to:
images, labels = trainloader.__iter__().__next__()
```

Thus, we get images and labels for a single batch.

## Conclusion

Thus, we saw how PyTorch borrows several advanced concepts from native Python itself in its API design. I hope the article was helpful to demystify how these concepts work behind the scenes and will help you become a better PyTorch user.
