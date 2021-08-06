#include <stdio.h>

const int SIZE = 5;
int REAR = -1;
int FRONT = -1;

int isFull() {
    return REAR == SIZE - 1;
}

int isEmpty() {
    return (FRONT == -1 || FRONT > REAR);
}

void enqueue(int queue[], int item) {
    if(isFull()) {
        printf("Queue is full.\n");
    } else {
        if (FRONT == -1)
            FRONT = 0;
        REAR++;
        queue[REAR] = item;
        printf("%d added to queue.\n", item);
    }
}

void dequeue(int queue[]) {
    if(isEmpty()) {
        printf("Queue is empty.\n");
    } else {
        printf("Removed %d from queue.", queue[FRONT]);
        FRONT++;
    }
}

void traverse(int queue[]) {
    int i;
    for(i=FRONT;i<=REAR;i++)
        printf("%d\t", queue[i]);
}

int main() {
    int queue[SIZE];
    int choice, temp;
    do {
        printf("\nEnter your choice:\n");
        printf("1.Enqueue\n2.Dequeue\n3.Display\n4.Exit\n");
        scanf("%d", &choice);
        switch(choice) {
            case 1: printf("\nEnter the number:");
                    scanf("%d", &temp);
                    enqueue(queue, temp);
                    break;
            case 2: dequeue(queue);
                    break;
            case 3: traverse(queue);
                    break;
            case 4: printf("Exiting.\n");
                    break;
            default: printf("Invalid input.\n");
        }
    } while(choice != 4);
    return 0;
}
