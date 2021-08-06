class Category:
    def __init__(self, name, products=[]):
        self.name = name
        self.products = products

    def __str__(self):
        output = f"  {self.name}\n"
        if len(self.products) < 1:
            output = f"No products available in {self.name}"
        else:
            for p in self.products:
                output += f"    {p}\n"

        return output
