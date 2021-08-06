#include <stdio.h>
#define MAX 5

int TOS = -1;


int isFull() {
    return TOS == MAX-1;
}

int isEmpty() {
    return TOS == -1;
}


void push(int Stack[], int item) {
    if( isFull()) {
        printf("Stack overflow.\n");
    }
    else {
        TOS++;
        Stack[TOS] = item;
        printf("%d pushed to stack.\n", item);
    }
}


void pop(int Stack[]) {
    if (isEmpty()) {
        printf("Stack empty.\n");
    } else {
        printf("%d poped from stack.\n", Stack[TOS]);
        TOS--;
    }
}


void peek(int Stack[]) {
    if (isEmpty())
        printf("The stack is empty.\n");
    else
        printf("The last element is %d\n", Stack[TOS]);
}


void traverse(int Stack[]) {
    int i;
    if(isEmpty()) {
        printf("The stack is empty.\n");
    } else {
        for(i=TOS;i>=0;i--) {
            printf("Item[%d] = %d\n", i, Stack[i]);
        }
    }
}

int main() {
    int Stack[MAX], temp;
    int choice;
    do {
        printf("Enter your choice:\n");
        printf("1.Push\n2.Pop\n3.Peek\n4.Display\n5.Exit\n");
        scanf("%d", &choice);
        switch(choice) {
            case 1: printf("Enter the item to push: ");
                    scanf("%d", &temp);
                    push(Stack, temp);
                    break;
            case 2: pop(Stack);
                    break;
            case 3: peek(Stack);
                    break;
            case 4: traverse(Stack);
                    break;
            case 5: printf("Exiting.....\n");
                    break;
            default: printf("Invalid choice.\n");
        }

    } while(choice!=5);
    return 0;
}
