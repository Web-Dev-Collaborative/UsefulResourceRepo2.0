// Fibonacci series using recusion.

#include <stdio.h>

int fib(int n) {
    if(n<2)
        return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    int n,i;
    printf("Enter the number of terms:");
    scanf("%d", &n);
    for(i=0;i<n;i++)
        printf("%d\t", fib(i));
    return 0;
}
