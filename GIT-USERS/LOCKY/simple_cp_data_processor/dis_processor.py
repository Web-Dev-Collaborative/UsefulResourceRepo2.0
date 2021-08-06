import glob
import sys
import csv

"""
    Convert PageRank List to csv fie for creating distribution chart.
    Per line example:
    Asia: 9.806000
"""

FILE_NAME = "sortedPageRankList"
DELIMETER = ":"

if __name__ == '__main__':
    cnt = 0
    pr_list = []

    try:
        with open(FILE_NAME) as f:
            for line in f:
                pr = line.split(DELIMETER)
                pr = pr[len(pr)-1]
                pr_list.append(pr)
                cnt = cnt + 1
    except IOError as exc:
        if exc.errno != errno.EISDIR:
            raise

    print 'Total lines %d' % cnt
    with open('distriution.csv', 'w') as csvfile:
        fieldnames = ['pages', 'pagerank']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for i, val in enumerate(pr_list):
            writer.writerow({'pages': i, 'pagerank': str(val).replace("\n", "")})
