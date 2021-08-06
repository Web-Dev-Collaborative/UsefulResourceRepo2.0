// Constants
#define MAX_LEN 128
#define MAX_LENGTH 30
#define MAX_WORDS 27
#define MAX_LEVEL 3
#define MAX_LIVES 5
#define INITIAL_LEVEL 0

// ASCII codes
#define HEART_SYMBOL 3
#define GEM_SYMBOL 4
#define ENTER 13
#define UP_ARROW 72
#define DOWN_ARROW 80


// COLOR CODES
const char *RED_COLOR = "COLOR C";
const char *YELLOW_COLOR = "COLOR E";
const char *GREEN_COLOR = "COLOR A";
const char *DARK_GRAY = "COLOR 7";
const char *LIGHT_GRAY = "COLOR 7";

const char *GAMEOVER_ASCII = "asciiart/gameover.txt";
const char *CONGRATS_ASCII = "asciiart/congrats.txt";

char WORDS[][MAX_WORDS][MAX_LENGTH]=
{

    {
        "start","apple","ball","cat","deer","elephant","fish","gun","horse","icecream","jug","kite","lamp","mango","nest",
        "orange","parrot","queen","rat","sun","tree","umbrella","vulture","wolf","xray","young","zebra"
    },
    
    {
        "australia","bhutan","cuba","denmark","egypt","france","germany","haiti","india","japan","kenya","libya","maldives",
        "nepal","oman","pakistan","qatar","russia","africa","thailand","uganda","china","yemen","zambia","america","canada"
    },
    
    {
        "start","pizazz","suburban","obstinance","thier","existentialism","sovereignty","dachshund","quetzalcoatl","calendar",
        "brewer","unsuburban","revince","witterness","reserene","scouress","stewardesses","qewryt","ethnicity","monopoly",
        "dates","faded","reweave","wedder","xray","bedewed","zebra"
    }
};

int GOAL[] = {300, 450, 600, 900, 1000}; // Goal Per Level