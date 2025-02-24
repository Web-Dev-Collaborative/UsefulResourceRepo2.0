# Phresh 'n Clean

Wipe your hard drive clean and install your apps quickly.

[**Preparation**](https://github.com/naoki-evan-hisamoto/phresh-n-clean/blob/master/README.md#preparation) section will prevent you from losing important files, documents, and registration keys upon reinstallation.

[**Wipe + Reinstall**](https://github.com/naoki-evan-hisamoto/phresh-n-clean/blob/master/README.md#wipe--reinstall) section will walk you through installing a phresh copy of OSX.

[**Set Up**](https://github.com/naoki-evan-hisamoto/phresh-n-clean/blob/master/README.md#set-up) section will walk you through getting your phresh machine up and running as quickly as possible.

[**Application Installation**](https://github.com/naoki-evan-hisamoto/phresh-n-clean/blob/master/README.md#application-installation) section will walk you through installing your applications.

[**Tasty Treats**](https://github.com/naoki-evan-hisamoto/phresh-n-clean/blob/master/README.md#tasty-treats) section will tell you some of our Liferay team members' top picks for applications and extensions.

## Preparation

The Preparation section will prevent you from losing important files, documents, and application keys upon reinstalling OSX. The hard drive is completely erased during this process and taking the time to back up files and deauthorizing applications will ensure you have zero regrets after your phresh install.

### 1. Back Up

A fresh install of OS X will wipe any files, programs, and documents from your hard drive. Whether you use Time Machine, the Cloud, or an external hard drive, be sure to have a back up of anything you will need on your phresh machine. If you are using the cloud, make sure all files are finished syncing as well.

> ###### Resources
>
> [How To Clean Install MacOS High Sierra](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)  
> Information from [OSXDaily](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)

### 2. Deauthorize

Your computer will be viewed as a new machine after the phresh install, which means that you will want to deauthorize any applications that required a registration key. Otherwise, the same key will not work when registering a product after the wipe and you might have to jump through hoops to get your product license back.

> ###### Resources
>
> [Make Your Mac Feel Like New Again With a Fresh Install of OSX](https://fieldguide.gizmodo.com/make-your-mac-feel-like-new-again-with-a-fresh-install-1697926482)  
> Information from [Field Guide—Gizmodo](https://fieldguide.gizmodo.com/make-your-mac-feel-like-new-again-with-a-fresh-install-1697926482)

---

## Wipe + Reinstall

The Wipe + Reinstall section will walk you through installing a phresh copy of OSX. When you are ready, you'll erase your hard drive and install the latest version of OSX. Once you are at this point, double-check that all necessary files, documents, pictures, and videos are backed up and all applications are deauthorized (as mentioned in the previous steps) because there is no going back after this step.

### 1. Wipe

You will be erasing your hard drive at this point. Once you have completed this step, your hard drive will be reformatted.

1. Make sure your computer is plugged into a power source.
2. `Restart` your computer and hold down `⌘ + R` as soon as the reboot starts. If successful, you will be met by the OSX Utilities screen.
3. Select **Disk Utility**, select your **Hard Drive**.
4. Select the **Erase** tab.
5. Rename your Hard Drive, select the [format](https://support.apple.com/guide/disk-utility/erase-a-volume-dskutl14079/mac) of your Hard Drive, and select **Erase**.
6. Once the drive has been formatted, exit out of Disk Utility to return to the OSX Utilities screen.

> ###### Resources
>
> [Make Your Mac Feel Like New Again With a Fresh Install of OSX](https://fieldguide.gizmodo.com/make-your-mac-feel-like-new-again-with-a-fresh-install-1697926482)  
> Information from [Field Guide—Gizmodo](https://fieldguide.gizmodo.com/make-your-mac-feel-like-new-again-with-a-fresh-install-1697926482)  
> [How to Clean Install MacOS high Sierra](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)  
> Information from [OSXDaily](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)  
> [Disk Utility Help—Erase a volume](https://support.apple.com/guide/disk-utility/erase-a-volume-dskutl14079/mac)  
> Information from [Apple Support](https://support.apple.com/guide/disk-utility/erase-a-volume-dskutl14079/mac)

---

### 2. Reinstall

Now that you have a reformatted hard drive, you will be installing a phresh copy of the latest OSX onto your hard drive (Unless you have the installation files for a different OS version on a flash drive).

1. Make sure your computer is plugged into a power source.
2. From the OSX Utilities screen select **install macOS**.
3. Select the hard drive you just reformatted in step 3 of the previous section.
4. Select **Install** and select your preferences as prompted.

> ###### Resources
>
> [How To Clean Install MacOS High Sierra](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)  
> Information from [OSXDaily](http://osxdaily.com/2017/10/02/clean-install-macos-high-sierra/)

##

## Set Up

The Set Up section will walk you through getting your phresh machine up and running as quickly as possible. We will set up the computer with Homebrew, Node, NPM, Gulp, Homebrew Cask, Git, and Github. This will prepare your computer for future processes such as installing applications quickly.

### 1. Homebrew [:link:](http://brew.sh)

Homebrew is a great tool for web developers. First, it makes removing Node very easy (otherwise you have to crawl through your file system and delete a bunch of files manually). Second, it greatly simplfies the installation of other useful packages like Git, Ruby, or the very useful wget utility.

1. Paste this into a Terminal prompt:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

> ###### Resources
>
> [Homebrew Documentation](https://docs.brew.sh/)
> Description from [Treehouse blog](http://blog.teamtreehouse.com/install-node-js-npm-mac)

##

### 2. Node + NPM [:link:](https://www.npmjs.com)

NPM is a package manager for JavaScript and the world's largest software registry. Discover packages of reusable code — and assemble them in powerful new ways.

1. Enter `brew install node` into a Terminal prompt.
2. Enter `npm install npm@latest -g` into a Terminal prompt.
3. To check the install, enter `node -v; npm -v`. You should see two numbers print out which are the versions for node and npm respectively.

> ###### Resources
>
> [npmjs Documentation](https://docs.npmjs.com/)
> Description from [npmjs](https://www.npmjs.com)

##

### 3. Gulp [:link:](https://gulpjs.com/)

gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.

1. Enter `npm install -global gulp-cli` into a Terminal prompt.
2. To check the install, enter `gulp -v`. You should see a number print out which is the version for gulp.

> ###### Resources
>
> [gulpjs Documentation](https://github.com/gulpjs/gulp)
> Description from [gulpjs](https://github.com/gulpjs/gulp)

##

### 4. Homebrew Cask [:link:](https://caskroom.github.io/)

Homebrew-Cask extends Homebrew and brings its elegance, simplicity, and speed to macOS applications and large binaries alike.

1. Enter `brew tap caskroom/cask` into a Terminal prompt.

> ###### Resources
>
> [Homebrew Cask Documentation](https://caskroom.github.io/)
> Description from [Homebrew Cask](https://caskroom.github.io/)

##

### 5. Caskroom-fonts [:link:](https://github.com/caskroom/homebrew-fonts)

Caskroom-fonts is a Homebrew Tap which allows you to use the same friendly Homebrew-style CLI workflow for the administration of binary font files on your Mac.

1. Enter `brew tap caskroom/fonts` into a Terminal prompt.

> ###### Resources
>
> [Caskroom Fonts Documentation](https://github.com/caskroom/homebrew-fonts)
> Description from [Caskroom Fonts](https://github.com/caskroom/homebrew-fonts)

##

### 6. Git + GitHub [:link:](https://github.com/)

GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside millions of other developers.

1. [Set up Git and authenticate with GitHub](https://help.github.com/articles/set-up-git/)
   1. Install Git by entering `brew install git` into your terminal and hitting 'enter'.
   1. [Set your username](https://help.github.com/articles/setting-your-username-in-git/).
   1. [Set your commit email address](https://help.github.com/articles/setting-your-commit-email-address-in-git/) (use the email your GitHub account is associated with).
   1. [Cash your password inside Git](https://help.github.com/articles/caching-your-github-password-in-git/) (makes life easier).

> ###### Resources
>
> [Getting Started - Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics) > [Github Guides](https://guides.github.com/)  
> Description from [Github](https://github.com/)

##

## Application Installation

The Application Installation section will walk you through installing your applications. Using Homebrew Cask, you can download and install the necessary applications, and clean the download files with just a few lines of code.

### 1. Homebrew Cask [:link:](https://caskroom.github.io/)

Homebrew-Cask extends Homebrew and brings its elegance, simplicity, and speed to macOS applications and large binaries alike.

#### Application

1. Decide what applications you would like to install with [Homebrew Cask Search](https://caskroom.github.io/search). 2. Enter `brew cask install [application]` into a Terminal prompt. This will install the selected application.
2. Enter `brew cask install [application][space][application]` into a Terminal prompt to install multiple applications.
3. After installing all desired applications, enter `brew cask cleanup` into a Terminal prompt to delete all download files.
4. Enter `brew cask upgrade` into a Terminal prompt to upgrade all outdated casks.

To install all of the following applications with a single line of code:

1.  Enter `brew cask install google-chrome firefox slack skype figma sketch craftmanager adobe-creative-cloud sublime-text hyper` into a Terminal prompt.

#### Fonts

1. Decide what fonts you would like to install with this directory
2. Enter `brew cask install font-[font-name]` into a Terminal prompt
3. To install Sourrce Sans Pro, enter `brew cask install font-source-sans-pro` into a Terminal prompt.

**Web Browsers**:

1.  [Google Chrome](https://www.google.com/chrome/?brand=CHBD&gclid=EAIaIQobChMIusnh086w2gIV2D2BCh1K6QSJEAAYASAAEgICbPD_BwE) `google-chrome`
2.  [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) `firefox`

**Communication Tools**:

1.  [Slack](https://slack.com/) `slack`
2.  [Skype](https://www.skype.com/en/) `skype`

**Design Tools**:

1.  [Figma](https://www.figma.com/) `figma`
2.  [Sketch](https://www.sketchapp.com/) `sketch`
3.  [Craft Manager](https://www.invisionapp.com/craft?utm_source=google&utm_medium=paid_search&utm_campaign=AW_EC_G_NAM_Search_SemiBranded_EM&utm_content=Craftmanager_EM&utm_term=craftmanager_e&_bk=craftmanager&_bt=205525527839&_bm=e&_bn=g&gclid=EAIaIQobChMI-OO-5NKw2gIVGL3sCh0c6wA-EAAYASAAEgIh3_D_BwE) `craftmanager`
4.  [Adobe Creative Cloud](https://www.adobe.com/creativecloud.html) `adobe-creative-cloud`

**Text Editors**:

1.  [Sublime Text](https://www.sublimetext.com/) `sublime-text`

**Terminal**:

1.  [Hyper](https://hyper.is/) `hyper`

> ###### Resources
>
> [Homebrew Cask Documentation](https://github.com/caskroom/homebrew-cask/blob/master/USAGE.md)
> Description from [Homebrew Cask](https://caskroom.github.io/)

---

## Tasty Treats

The Tasty Treats section will tell you some of our Liferay team members' top picks for applications and extensions.

### Paul Hanaoka's Picks

1. [Clipy](https://clipy-app.com/)
1. [Imageoptim](https://imageoptim.com/)
1. [zsh](https://ohmyz.sh)
   1. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
   1. [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
1. [VS Code](https://code.visualstudio.com)
   1. [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) — [Paul's Settings (Gist)](https://gist.github.com/plhnk/684f94eb90575c908f2e9b53b8dfecdf)

To install all of the following applications with a single line of code enter:

`brew cask install clipy imageoptim zsh zsh-autosuggestions zsh-syntax-highlighting visual-studio-code`

into a Terminal prompt.

#### Paul's Complete List

`brew cask install google-chrome firefox slack skype figma sketch google-drive-file-stream adobe-creative-cloud sublime-text flux bettertouchtool opera visual-studio-code vivaldi clipy dropbox imageoptim brave`

#### Paul's Fonts

`brew cask install font-source-sans-pro font-blokk-neue font-playfair-display-sc font-playfair-display`

### Abel Hancock's Top Picks

1. [iterm<sup>2</sup>](https://www.iterm2.com/) `iterm2`
2. [Color Oracle](http://colororacle.org/) `color-oracle`

To install all of the following applications with a single line of code enter

`brew cask install iterm2`

into a Terminal prompt.

### Naoki Hisamoto's Top Picks

1. [Notion](https://www.notion.so/) `notion`
2. [Caffeine](http://lightheadsw.com/caffeine/) `caffeine`
3. [Karabiner Elements](https://pqrs.org/osx/karabiner/) `karabiner-elements`
4. [Spotify](https://www.spotify.com/us/) `spotify`

To install all of the following applications with a single line of code enter

`brew cask install notion caffeine karabiner-elements spotify`

into a Terminal prompt.

### Rebecca Wu's Top Picks

1. [Flux](https://justgetflux.com/) `flux`
2. [Evernote](https://evernote.com/) `evernote`

To install all of the following applications with a single line of code enter:

`brew cask install flux evernote`

into a Terminal prompt.

### James Lyons' Top Picks

1. [Chunk Window Manager](https://koekeishiya.github.io/chunkwm/) `chunkwm`
2. [Simple Hotkey Daemon](https://github.com/koekeishiya/skhd) `skhd`
3. [GitKraken](https://www.gitkraken.com/) `gitkraken`

To install all of the following applications with a few lines of code enter:

```
brew tap crisidev/homebrew-chunkwm
brew install chunkwm koekeishiya/formulae/skhd
brew cask install gitkraken
```

into a Terminal prompt.
