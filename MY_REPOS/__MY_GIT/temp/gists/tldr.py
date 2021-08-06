from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
import sys

# python tldr.py filename.pdf

fp = open(sys.argv[1], 'rb')
parser = PDFParser(fp)
doc = PDFDocument(parser)

outlines = doc.get_outlines()
for (level, title, dest, a, se) in outlines:
    print ' ' * (level - 1) + title