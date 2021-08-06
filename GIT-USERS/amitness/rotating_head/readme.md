#Rotating Heads

This plugin was written for use in the [Anthropose](http://anthropose.com/product/aristle/) website in order to show how sunglasses would look like. This is actually a very low tech solution to a virtual try-on implemented in the Rayban website and is heavily inspired from the [Warby Parker](https://www.warbyparker.com/) website.

##General Idea
1. The general idea in this plugin is to use a [sprite image](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/CSS_Image_Sprites) so that all angles are loaded simultaneously.
2. If the number of images are 5 then the container is also divided into 5 parts.
3. Hover on each part of the container will change the background position of the sprite to match accordingly.

##Options
###Options include:
1. total_banner_width in pixels *(width of entire sprite )*
2. total_width in pixels *(width of each individual item image in sprite)*
3. Number of images is the number of seperate blocks within the sprite image.

##Usage
1. Using defaults
> $("#rotate-container").rotateHeads();

2. Using options
> $("#rotate-container").rotateHeads({
    total_banner_width: 2551,
    total_width: 431
});
