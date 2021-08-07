from product import Product

class Footware(Product):
    def __init__(self, name, price, color, size):
        super().__init__(name, price)
        self.color = color
        self.size = size

    def __str__(self):
        return f"{super().__str__()} in {self.color} size {self.size}"

# shoes = Footware("Running Shoes", 20, "Red", 12)
# print(shoes)