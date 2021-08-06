from product import Product


class Ball(Product):
    def __init__(self, name, price, solid):
        super().__init__(name, price)
        self.solid = solid

    def __str__(self):
        return (
            f"{super().__str__()} and {'is solid' if self.solid else 'is inflatable'}"
        )


# basketball = Ball("Wilson Power Ball", 25, True)

# print(basketball)
