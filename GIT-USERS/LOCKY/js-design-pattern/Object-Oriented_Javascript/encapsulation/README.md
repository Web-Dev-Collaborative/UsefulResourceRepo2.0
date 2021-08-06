# Encapsulation and information hiding

## Basic Patterns

- Fully Exposed Object

- Private Methods Using a Naming Comvention

- Scope, Nested Functions, and Closures

- Private Members Through Closures

## More Advanced Patterns

- Static Methods and Attributes

- Constants

- Singletons and Object Factories

### Benefits of Using Encapsulation

Encapsulation protects the integrity of the internal data. By allowing access to the data only through accessor and mutator methods.

### Drawbacks to Using Encapsulation

It can be very hard to unit test private methods. Because of the very fact that they are hidden, and their internal variables are shielded, it is impossible to access them outside of the object.
There are situations where it can be hard to distinguish between many identically named variables in different scopes.