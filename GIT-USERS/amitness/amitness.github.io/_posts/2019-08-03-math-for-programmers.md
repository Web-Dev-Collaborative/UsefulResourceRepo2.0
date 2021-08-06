---
title: "Math Symbols Explained with Python"
date: 2019-08-03T06:53:30-04:00
categories:
  - maths
classes: wide
excerpt: Learn the meaning behind mathematical symbols used in Machine Learning using your knowledge of Python.
---

When working with Machine Learning projects, you will come across a wide variety of equations that you need to implement in code. Mathematical notations capture a concept so eloquently but unfamiliarity with them makes them obscure.

In this post, I'll be explaining the most common math notations by connecting it with its analogous concept in Python. Once you learn them, you will be able to intuitively grasp the intention of an equation and be able to implement it in code.

$$
\frac{1}{N} \sum_{i=1}^{N} (y_i - \hat{y_i})^2
$$

## Indexing

$$
x_i
$$

This symbol is taking the value at i$$^{th}$$ index of a vector.

```python
x = [10, 20, 30]
i = 0
print(x[i]) # 10
```

This can be extended for 2D vectors and so on.

$$
x_{ij}
$$

```python
x = [ [10, 20, 30], [40, 50, 60] ]
i = 0
j = 1
print(x[i][j]) # 20
```

## Sigma

$$
\sum_{i=1}^{N} x_i
$$

This symbol finds the sum of all elements in a vector for a given range. Both lower and upper limits are inclusive. In Python, it is equivalent to looping over a vector from index 0 to index N-1. Notice how we're using the previously explained $$x_i$$ symbol to get the value at index.

```python
x = [1, 2, 3, 4, 5]
result = 0
N = len(x)
for i in range(N):
    result = result + x[i]
print(result)
```

The above code can even be shortened using built-in functions in Python as

```python
x = [1, 2, 3, 4, 5]
result = sum(x)
```

## Average

$$
\frac{1}{N}\sum_{i=1}^{N} x_i
$$

Here we reuse the sigma notation and divide by the number of elements to get an average.

```python
x = [1, 2, 3, 4, 5]
result = 0
N = len(x)
for i in range(N):
    result = result + x[i]
average = result / N
print(average)
```

The above code can even be shortened in Python as

```python
x = [1, 2, 3, 4, 5]
result = sum(x) / len(x)
```

## PI

$$
\prod_{i=1}^{N} x_i
$$

This symbol finds the product of all elements in a vector for a given range. In Python, it is equivalent to looping over a vector from index 0 to index N-1 and multiplying them.

```python
x = [1, 2, 3, 4, 5]
result = 1
N = len(x)
for i in range(N):
    result = result * x[i]
print(result)
```

## Pipe

The pipe symbol can mean different things based on where it's applied.

### Absolute Value

$$
\lVert x \rVert
$$

$$
\lVert y \rVert
$$

This symbol denotes the absolute value of a number i.e. without a sign.

```python
x = 10
y = -20
abs(x) # 10
abs(y) # 20
```

<br>

### Norm of vector

$$
\lVert x \rVert
$$

The norm is used to calculate the magnitude of a vector. In Python, this means squaring each element of an array, summing them and then taking the square root.

```python
import math

x = [1, 2, 3]
math.sqrt(x[0]**2 + x[1]**2 + x[2]**2)
```

## Belongs to

$$
3\ \in\ X
$$

This symbol checks if an element is part of a set. In Python, this would be equivalent to

```python
X = {1, 2, 3}
3 in X
```

## Function

$$
f: X \rightarrow Y
$$

This denotes a function which takes a domain X and maps it to range Y. In Python, it's equivalent to taking a pool of values X, doing some operation on it to calculate pool of values Y.

```python
def f(X):
    Y = ...
    return Y
```

You will encounter the following symbols in place of X and Y. Here are what they mean:

$$
f: R \rightarrow R
$$

`R` means input and outputs are real numbers and can take any value (integer, float, irrational, rational).
In Python, this is equivalent to any value except complex numbers.

```python
import math
x = 1
y = 2.5
z = math.pi
```

You will also encounter symbols such as

$$
f: R^d \rightarrow R
$$

$$R^d$$ means d-dimensional vector of real numbers.

Let's assume d = 2. In Python, an example can be a function that takes 2-D array and returns it's sum. It will be mapping a $$R^d$$ to $$R$$

```python
X = [1, 2]
f = sum
Y = f(X)
```

## Tensors

### Transpose

$$
X^{\mathsf{T}}
$$

This is basically exchanging the rows and columns.
In Python, this would be equivalent to

```python
import numpy as np
X = [[1, 2, 3],
    [4, 5, 6]]
np.transpose(X)
```

Output would be a list with exchanged rows and columns.

```
[[1, 4],
 [2, 5],
 [3, 6]]
```

### Element wise multiplication

$$
z = x \odot y
$$

It means multiplying the corresponding elements in two tensors. In Python, this would be equivalent to multiplying the corresponding elements in two lists.

```python
import numpy as np
x = [[1, 2],
    [3, 4]]
y = [[2, 2],
    [2, 2]]
z = np.multiply(x, y)
```

Output is

```
[[2, 4]],
[[6, 8]]
```

### Dot Product

$$
xy
$$

$$
x \cdot y
$$

It gives the sum of the products of the corresponding entries of the two sequences of numbers.

```python
x = [1, 2, 3]
y = [4, 5, 6]
dot = sum([i*j for i, j in zip(x, y)])
# 1*4 + 2*5 + 3*6
# 32
```

### Hat

$$
\hat{x}
$$

The hat gives the unit vector. This means dividing each component in a vector by it's length(norm).

```python
import math
x = [1, 2, 3]
length = math.sqrt(sum([e**2 for e in x]))
x_hat = [e/length for e in x]
```

This makes the magnitude of the vector 1 and only keeps the direction.

```python
import math
math.sqrt(sum([e**2 for e in x_hat]))
# 1.0
```

## Exclamation

$$
x!
$$

This denotes the factorial of a number. It is the product of numbers starting from 1 to that number. In Python, it can be calculated as

```python
x = 5
fact = 1
for i in range(x, 0, -1):
    fact = fact * i
print(fact)
```

The same thing can also be calculated using built-in function.

```python
import math
x = 5
math.factorial(x)
```

The output is

```
# 5*4*3*2*1
120
```
