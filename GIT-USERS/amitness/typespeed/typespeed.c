
/*
  A game made for the mini project.
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include "config.h"


int i,
	lives_left = MAX_LIVES,
	start_time = 0,
	end_time = 0,
	total_score = 0;

FILE *fptr = NULL;

void display_ascii(FILE *fptr)
{
    char read_string[MAX_LEN];
    while(fgets(read_string, sizeof(read_string), fptr) != NULL)
        printf("%s", read_string);
}


//Function for time delay
void delay(unsigned int mseconds) {
    clock_t goal=mseconds+clock();
    while (goal>clock());
}


void typespeed_logo() {
     printf("      %c%c%c%c%c%c%c %c    %c %c%c%c%c%c %c%c%c%c%c%c",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
     printf("     %c%c%c%c%c%c %c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c%c   \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
     printf("         %c     %c  %c  %c   %c %c%c",176,176,176,176,176,176,176);
     printf("         %c      %c   %c %c%c     %c%c      %c    %c%c  \n",176,176,176,176,176,176,176,176,176,176);
     printf("         %c      %c%c   %c%c%c%c%c %c%c%c%c%c",176,176,176,176,176,176,176,176,176,176,176,176,176);
     printf("      %c%c%c%c%c%c %c%c%c%c%c %c%c%c%c%c  %c%c%c%c%c   %c     %c%c  \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
     printf("         %c      %c%c   %c     %c%c",176,176,176,176,176,176);
     printf("              %c %c     %c%c     %c%c      %c    %c%c  \n",176,176,176,176,176,176,176,176,176);
     printf("         %c      %c%c   %c     %c%c%c%c%c%c",176,176,176,176,176,176,176,176,176,176);
     printf("     %c%c%c%c%c%c %c     %c%c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c%c   \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
}


void type_logo() {
    printf("\t\t         %c%c%c%c%c%c%c %c    %c %c%c%c%c%c %c%c%c%c%c%c \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
    printf("\t\t            %c     %c  %c  %c   %c %c%c       \n",176,176,176,176,176,176,176);
    printf("\t\t            %c      %c%c   %c%c%c%c%c %c%c%c%c%c     \n",176,176,176,176,176,176,176,176,176,176,176,176,176);
    printf("\t\t            %c      %c%c   %c     %c%c       \n",176,176,176,176,176,176);
    printf("\t\t            %c      %c%c   %c     %c%c%c%c%c%c\n",176,176,176,176,176,176,176,176,176,176);
}


void speed_logo() {
    printf("\t\t      %c%c%c%c%c%c %c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c%c   \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
    printf("\t\t      %c      %c   %c %c%c     %c%c      %c    %c%c  \n",176,176,176,176,176,176,176,176,176,176);
    printf("\t\t      %c%c%c%c%c%c %c%c%c%c%c %c%c%c%c%c  %c%c%c%c%c   %c     %c%c  \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
    printf("\t\t           %c %c     %c%c     %c%c      %c    %c%c  \n",176,176,176,176,176,176,176,176,176);
    printf("\t\t      %c%c%c%c%c%c %c     %c%c%c%c%c%c %c%c%c%c%c%c %c%c%c%c%c%c%c   \n",176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176);
}


void loading_screen() {
    int k;
    printf(" \t\t\t\t%c%c%c%c%c%c%c%c%c%c%c%c%c",177,177,177,177,177,177,177,177,177,177,177,177,177);
    printf("\b\b\b\b\b\b\b\b\b\b\b\b\b");
    for(k = 1; k <= 13; k++) {
        if (k <= 3) {
            delay(250);
            printf("\xdb");
        }
        else if(k > 3 && k <= 6) {
            delay(150);
            printf("\xdb");
        }
        else if(k > 6) {
            delay(100);
            printf("\xdb");
            delay(12);
        }
    }
}


void start_screen() {
    int i, j;
     system("cls||clear");
    printf("\n\n\n\n\n\n");
    printf("\n\n");
    for(i=0; i <= 5; i++) {
        delay(30);
         system("cls||clear");
        for(j=0; j<=i; j++) {
            printf("\n");
        }
        type_logo();
        printf("\n");
        speed_logo();
    }
    delay(600);
    printf("\n\n");
    printf("\t\t\t\tStarting Game");
    printf("\n");
    loading_screen();
    delay(600);
    printf("\n\n\nPress any key to continue....");
    getch();
}


void show_instructions() {
    system("cls||clear");
    printf("\n\n\n\n [1] Type the WORDS displayed as fast as possible and with minimum mistakes to yeild maximum score.\n\n");
    printf("[2] If the user types the given word within 15 second, they are granted with +5 points else +4 points.\n\n");
    printf("[3]Each mistake reduces the life by 1. User has only 5 lifes available to complete whole game.\n\n");
    printf("[4] Each level starts with a 0 score.");
    getch();
}


void game_menu() {
	int chosen = 1;
	system(YELLOW_COLOR);

	char options[] = "\t\t\t       \20  1. Start Game\n\t\t\t          2. Instructions\n\t\t\t          3. Quit\n\n Please Choose Your Option";
	char *chosen_one = "\t\t\t        \20 1. Start Game\n\t\t\t          2. Instructions\n\t\t\t          3. Quit\n\n Please Choose Your Option";
	char *chosen_two = "\t\t\t          1. Start Game\n\t\t\t        \20 2. Instructions\n\t\t\t          3. Quit\n\n Please Choose Your Option";
	char *chosen_three = "\t\t\t          1. Start Game\n\t\t\t          2. Instructions\n\t\t\t        \20 3. Quit\n\n Please Choose Your Option";
	char pressed_key;
	do {
		system("cls||clear");
		typespeed_logo();
		printf("\n\n\n\n");
	 	printf("\t\t\t       Menu:\n%s",options);
		pressed_key = getch();
		if (pressed_key == DOWN_ARROW && chosen == 1) {
	  		strcpy(options, chosen_two);
	   		chosen = 2;
		} else if (pressed_key == DOWN_ARROW && chosen == 2) {
			strcpy(options, chosen_three);
			chosen = 3;
		} else if (pressed_key == DOWN_ARROW && chosen == 3) {
	    	strcpy(options, chosen_one);
	    	chosen = 1;
	 	} else if (pressed_key == UP_ARROW && chosen == 1) {
	  		strcpy(options, chosen_three);
	    	chosen = 3;
	  	} else if (pressed_key == UP_ARROW && chosen == 2) {
	    	strcpy(options, chosen_one);
	    	chosen = 1;
	  	} else if (pressed_key == UP_ARROW && chosen == 3) {
	    	strcpy(options, chosen_two);
	    	chosen = 2;
	  	}
		delay(50);
	} while (pressed_key != ENTER);

    switch(chosen) {
		case 1: game(INITIAL_LEVEL);
    		    break;
		case 2: show_instructions();
				game_menu();
        		break;
		case 3: system("cls||clear");
    		    printf("T h a n k  Y o u.");
    		    break;
	}
}


void advance_level(int level) {
    system("cls||clear");
    system(GREEN_COLOR);
    printf("\n%*s%d%s\n\n\n",35,"L E V E L   " , level + 1,"   C O M P L E T E");
    end_time = clock() / 1000 - start_time;
    printf("%*s %ds\n\n", 43, "Time Taken:", end_time);
    printf("%*s %d %c\n", 43, "Total Score:", total_score, GEM_SYMBOL);
    printf("\n\n%*s\n%*s",47,"UPGRADING LEVEL.....",38," ");
	delay(2000);
    system(DARK_GRAY);
    level++;
    if (level < MAX_LEVEL) {
    	game(level);
    } else {
    	system("cls||clear");
    	system(YELLOW_COLOR);
    	if((fptr = fopen(CONGRATS_ASCII,"r")) == NULL) {
     		fprintf(stderr,"error opening %s\n",CONGRATS_ASCII);
     		return 1;
     	}
     	display_ascii(fptr);
     	fclose(fptr);
     	printf("\n\n%*s%d", 40, "Score: ", total_score);
     	exit(0);
    }
}


int game(int level) {
    
    int i, j = 0, k, score = 0;
    int start_time = clock() / 1000; 
    int b[MAX_WORDS];
    char c;
    char word[MAX_LENGTH];
    srand(time(NULL));
    
    system(DARK_GRAY);
    while (score < GOAL[level] && lives_left > 0) {
        int p = 0;
        int index = rand() % 26 + 1;
        int screen_position = rand() % 1300 / 20;
        for (k = 0; k < j; k++) {
            if (index != b[k])
                p++;
        }
        if (p == j) {
            strcpy(word, WORDS[level][index]);
            b[j] = index;
            for (i = 0; word[i] != '\0'; i++) {
                if (lives_left == 0) break;
                system ("cls");
                printf("Level %d: Collect %d %c gems\n", level+1, GOAL[level], GEM_SYMBOL);
                printf("%*s", 70, "Lives:");
                for (k=0; k < lives_left; k++)
                	printf("%c", HEART_SYMBOL);
                printf("\n%*s%d %c\n\n\r",70,"Gems:", score, GEM_SYMBOL);
                printf("%*s",screen_position, word);
                 c = getch();

                if (c == word[i] || c + 32 == word[i]) {
                    word[i]=' ';
                    end_time = clock() / 1000 - start_time;
                    if (end_time <= 15)
                    	score += 5;
                    else if (end_time > 15 && end_time <= 25)
                    	score += 4;
                    else if (end_time > 25 && end_time <= 60)
                    	score += 3;
                    else if (end_time > 60 && end_time <= 120)
                    	score += 2;
                    else
                    	score += 1;
                    delay(10);
                } else {
                    i--;
                    lives_left--;
                    if (score >= 5)
                    	score -= 5;
                    else if (score > 0)
                    	score -= 1;
                   system(RED_COLOR);
                   delay(200);
                   system(LIGHT_GRAY);
                }
            }
            j++;
        }
    }

    total_score += score;
    if (lives_left == 0) {
         system("cls||clear");
         system(RED_COLOR);
         if((fptr = fopen(GAMEOVER_ASCII, "r")) == NULL) {
             fprintf(stderr, "error opening %s\n", GAMEOVER_ASCII);
             return 1;
         }
         display_ascii(fptr);
         fclose(fptr);
        printf("\n\n%*s %d", 56, " Y   O   U      S   C   O   R   E   D : ", total_score);
    } else {
        advance_level(level);
        getch();
    }

    return 0;
}


int main() {
    start_screen();
    game_menu();
	getch();
    return 0;
}
