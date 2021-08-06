# Inheritance

If you require several classes to each have a `toString` method that outputs the structure of the class in a certain way, you could copy and paste a `toString` method declaration into each class, but then each time you need to change how the method works,you would have to make the change to each class. 
If instead you create a `ToStringProvider` class and make each of the other classes inherit from it, this method would be declared in only one place.