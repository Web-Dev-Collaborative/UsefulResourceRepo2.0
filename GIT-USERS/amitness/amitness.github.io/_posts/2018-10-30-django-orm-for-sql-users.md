---
title: "Django ORM if you already know SQL"
date: 2018-10-30T22:16:30-04:00
categories:
  - django
classes: wide
excerpt: If you are migrating to Django from another MVC framework, chances are you already know SQL. In this post, I will be illustrating how to use Django ORM by drawing analogies to equivalent SQL statements.
header:
  og_image: /images/entity-diagram-django.png
  teaser: /images/entity-diagram-django.png
---

If you are migrating to Django from another MVC framework, chances are you already know SQL. 

In this post, I will be illustrating how to use Django ORM by drawing analogies to equivalent SQL statements. Connecting a new topic to your existing knowledge will help you learn to use the ORM faster.


Let us consider a simple base model for a person with attributes name, age, and gender. 

![Person ER Diagram](/images/entity-diagram-django.png){: .align-center}

To implement the above entity, we would model it as a table in SQL.

```sql
CREATE TABLE Person (
    id int,
    name varchar(50),
    age int NOT NULL,
    gender varchar(10),
);
```

The same table is modeled in Django as a class which inherits from the base Model class. The ORM creates the equivalent table under the hood.

```python
class Person(models.Model):
    name = models.CharField(max_length=50, blank=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, blank=True)
```

The most used data types are:  

|**SQL** | **Django**|
|--|--|
|`INT` | `IntegerField()`|
|`VARCHAR(n)` | `CharField(max_length=n)`|
|`TEXT` | `TextField()`|
|`FLOAT(n)` | `FloatField()`|
|`DATE` | `DateField()`|
|`TIME` | `TimeField()`|
|`DATETIME` | `DateTimeField()`|

The various queries we can use are:  
## SELECT Statement

**Fetch all rows**  
SQL:
```sql
SELECT *
FROM Person;
```

Django:
```python
persons = Person.objects.all()
for person in persons:
    print(person.name)
    print(person.gender)
    print(person.age)
```

**Fetch specific columns**  
SQL:
```sql
SELECT name, age
FROM Person;
```

Django:
```python
Person.objects.only('name', 'age')
```

**Fetch distinct rows**  
SQL:
```sql
SELECT DISTINCT name, age
FROM Person;
```

Django:
```python
Person.objects.values('name', 'age').distinct()
```

**Fetch specific number of rows**  
SQL:
```sql
SELECT *
FROM Person
LIMIT 10;
```

Django:
```python
Person.objects.all()[:10]
```

**LIMIT AND OFFSET keywords**  
SQL:  
```sql
SELECT *
FROM Person
OFFSET 5
LIMIT 5;
```

Django:
```python
Person.objects.all()[5:10]
```

## WHERE Clause

**Filter by single column**  
SQL:
```sql
SELECT *
FROM Person
WHERE id = 1;
```


Django:
```python
Person.objects.filter(id=1)
```

**Filter by comparison operators**  
SQL:
```sql
WHERE age > 18;
WHERE age >= 18;
WHERE age < 18;
WHERE age <= 18;
WHERE age != 18;
```


Django:
```python
Person.objects.filter(age__gt=18)
Person.objects.filter(age__gte=18)
Person.objects.filter(age__lt=18)
Person.objects.filter(age__lte=18)
Person.objects.exclude(age=18)
```

**BETWEEN Clause**  
SQL:
```sql
SELECT *
FROM Person 
WHERE age BETWEEN 10 AND 20;
```

Django:
```python
Person.objects.filter(age__range=(10, 20))
```

**LIKE operator**  
SQL:
```sql
WHERE name like '%A%';
WHERE name like binary '%A%';
WHERE name like 'A%';
WHERE name like binary 'A%';
WHERE name like '%A';
WHERE name like binary '%A';
```

Django:
```python
Person.objects.filter(name__icontains='A')
Person.objects.filter(name__contains='A')
Person.objects.filter(name__istartswith='A')
Person.objects.filter(name__startswith='A')
Person.objects.filter(name__iendswith='A')
Person.objects.filter(name__endswith='A')
```

**IN operator**  
SQL:
```sql
WHERE id in (1, 2);
```

Django:
```python
Person.objects.filter(id__in=[1, 2])
```

## AND, OR and NOT Operators  
SQL:
```sql
WHERE gender='male' AND age > 25;
```

Django:
```python
Person.objects.filter(gender='male', age__gt=25)
```

SQL:
```sql
WHERE gender='male' OR age > 25;
```

Django:
```python
from django.db.models import Q
Person.objects.filter(Q(gender='male') | Q(age__gt=25))
```

SQL:
```sql
WHERE NOT gender='male';
```

Django:
```python
Person.objects.exclude(gender='male')
```  

## NULL Values
SQL:
```sql
WHERE age is NULL;
WHERE age is NOT NULL;
```

Django:
```python
Person.objects.filter(age__isnull=True)
Person.objects.filter(age__isnull=False)

# Alternate approach
Person.objects.filter(age=None)
Person.objects.exclude(age=None)
```

## ORDER BY Keyword  
**Ascending Order**  
SQL:
```sql
SELECT *
FROM Person
order by age;
```

Django:
```python
Person.objects.order_by('age')
```

**Descending Order**  
SQL:
```sql
SELECT *
FROM Person
ORDER BY age DESC;
```

Django:
```python
Person.objects.order_by('-age')
```

## INSERT INTO Statement
SQL:
```sql
INSERT INTO Person
VALUES ('Jack', '23', 'male');
```

Django:
```python
Person.objects.create(name='jack', age=23, gender='male)
```

## UPDATE Statement
**Update single row**  
SQL:
```sql
UPDATE Person
SET age = 20
WHERE id = 1;
```

Django:
```python
person = Person.objects.get(id=1)
person.age = 20
person.save()
```

**Update multiple rows**  
SQL:
```sql
UPDATE Person
SET age = age * 1.5;
```

Django:
```python
from django.db.models import F

Person.objects.update(age=F('age')*1.5)
```

## DELETE Statement
**Delete all rows**  
SQL:
```sql
DELETE FROM Person;
```

Django:
```python
Person.objects.all().delete()
```

**Delete specific rows**  
SQL:
```sql
DELETE FROM Person
WHERE age < 10;
```

Django:
```python
Person.objects.filter(age__lt=10).delete()
```

## Aggregation
**MIN Function**  
SQL:
```sql
SELECT MIN(age)
FROM Person;
```

Django:
```python
>>> from django.db.models import Min
>>> Person.objects.all().aggregate(Min('age'))
{'age__min': 0}
```

**MAX Function**  
SQL:
```sql
SELECT MAX(age)
FROM Person;
```

Django:
```python
>>> from django.db.models import Max
>>> Person.objects.all().aggregate(Max('age'))
{'age__max': 100}
```

**AVG Function**  
SQL:
```sql
SELECT AVG(age)
FROM Person;
```

Django:
```python
>>> from django.db.models import Avg
>>> Person.objects.all().aggregate(Avg('age'))
{'age__avg': 50}
```

**SUM Function**  
SQL:
```sql
SELECT SUM(age)
FROM Person;
```

Django:
```python
>>> from django.db.models import Sum
>>> Person.objects.all().aggregate(Sum('age'))
{'age__sum': 5050}
```

**COUNT Function**  
SQL:
```sql
SELECT COUNT(*)
FROM Person;
```

Django:
```python
Person.objects.count()
```

## GROUP BY Statement
**Count of Person by gender**  
SQL:
```sql
SELECT gender, COUNT(*) as count
FROM Person
GROUP BY gender;
```

Django:
```python
Person.objects.values('gender').annotate(count=Count('gender'))
```

## HAVING Clause
**Count of Person by gender if number of person is greater than 1**   
SQL: 
```sql
SELECT gender, COUNT('gender') as count
FROM Person
GROUP BY gender
HAVING count > 1;
```

Django:
```python
Person.objects.annotate(count=Count('gender'))
.values('gender', 'count')
.filter(count__gt=1)
```

## JOINS
Consider a foreign key relationship between books and publisher.

```python
class Publisher(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
```

**Fetch publisher name for a book**  
SQL:
```sql
SELECT name
FROM Book
LEFT JOIN Publisher
ON Book.publisher_id = Publisher.id
WHERE Book.id=1;
```

Django:
```python
book = Book.objects.select_related('publisher').get(id=1)
book.publisher.name
```

**Fetch books which have specific publisher**  
SQL:  
```sql
SELECT *
FROM Book
WHERE Book.publisher_id = 1;
```

Django:
```python
publisher = Publisher.objects.prefetch_related('book_set').get(id=1)
books = publisher.book_set.all()
```
