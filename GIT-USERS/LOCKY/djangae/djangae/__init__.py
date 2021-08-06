import os
import sys

extra_library_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "lib")
if extra_library_path not in sys.path:
    sys.path.insert(1, extra_library_path)