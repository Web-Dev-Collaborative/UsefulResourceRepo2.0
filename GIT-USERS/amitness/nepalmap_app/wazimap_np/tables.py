from wazimap.data.tables import FieldTable


# Define our tables so the data API can discover them.
FieldTable(['main type of cooking fuel'], universe='Households',
           table_per_level=False)
