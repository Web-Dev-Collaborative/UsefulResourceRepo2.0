import glob
import sys

"""
    Per line Example
    Daedalus	-::-1.062#-::-Acropolis of Athens-::-Athens-::-Acropolis-::-Crete-::-Athena-::-Aphrodite-::-Crete
    [page_title] -::-[PageRank]#-::-[link1]-::-[link2]-::-[link3]...etc
"""

LINK_DELIMETER = "-::-"
TITLE_LINK_DELIMETER = "#"


def get_pr(str):
    str = "".join(str.split())
    list = str.split(TITLE_LINK_DELIMETER)
    return float(list[0].split(LINK_DELIMETER)[1])

if __name__ == '__main__':
    cnt = 0
    pr_dic = {}
    for i in range(0, 10):
        """
            Your mutiple folders name will be 103062529_PR_Calculate0 to 103062529_PR_Calculate9
            Read all files under 103062529_PR_Calculate0, 103062529_PR_Calculate1 to 103062529_PR_Calculate9
        """
        path = "".join(("103062529_PR_Calculate", str(i), "/*"))
        files = glob.glob(path)
        for file in files:
            pr_list = []
            try:
                with open(file) as f:
                    for line in f:
                        cnt = cnt + 1
                        pr = get_pr(line)
                        pr_list.append(pr)
            except IOError as exc:
                if exc.errno != errno.EISDIR:
                    raise

        pr_dic['iter' + str(i)] = sum(pr_list)
    # print pr_dic
    print 'Total lines %d' % cnt

    """
    Count the distance.
    """
    distance = 0
    for i in range(0, 10):
        if i == 0:
            print "Iteration", i+1, pr_dic['iter' + str(i)]
        else:
            distance = pr_dic['iter' + str(i)] - pr_dic['iter' + str(i-1)]
            print "Iteration", i+1, abs(distance)
