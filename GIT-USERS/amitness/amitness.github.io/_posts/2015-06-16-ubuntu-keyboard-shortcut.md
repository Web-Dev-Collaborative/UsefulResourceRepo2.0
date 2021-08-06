---
title: "Shutdown Ubuntu With A Keyboard Shortcut"
date: 2015-06-16T08:00:30-04:00
categories:
  - linux
classes: wide
excerpt: In Windows, we can use Alt+F4 keyboard shortcut to shutdown. But Linux doesn’t have such feature out of the box. After switching to Ubuntu, I struggled trying to make a keyboard shortcut for shutting down the computer.
header:
  og_image: /images/keyboard-shortcuts.png
  teaser: /images/keyboard-shortcuts.png
---

In Windows, we can use Alt+F4 keyboard shortcut to shutdown. But Linux doesn’t have such feature out of the box. After switching to Ubuntu, I struggled trying to make a keyboard shortcut for shutting down the computer. 

So I started reading about the packages related to shutdown and discovered a method that works flawlessly. We utilize a package called *shutdown* that’s present by default in the /sbin directory.

## Steps:

- Open a terminal and enter the following command.  You will be asked for the password.

```bash
sudo chmod u+s /sbin/shutdown
```

- Then goto System Settings > Keyboard and in the shortcuts tab, click Custom Shortcuts

![Keyboard Shortcuts](/images/keyboard-shortcuts.png){: .align-center}

- Then click the “Add custom shortcut” button and a popup will open. In it add name as *“Shutdown”* and command as **“shutdown -h now”** . Then click add.

![Custom Shortcut Menu](/images/custom-shortcut.png){: .align-center}

- After adding, you will get a list of shortcuts as shown below. In that click shutdown and below it, there will be three unassigned. Click the first unassigned and it will change into *“Pick an accelerator“*. Then click ```Ctrl+Alt+K``` at the same time. This will be our shortcut for shutdown.

![Key Binding Menu](/images/keyboard-binding.png){: .align-center}

**Tip**: You can make a shortcut for restart as well, follow the same tutorial except in step 3, use code *shutdown **-r** now* .

You have a fully functioning keyboard shortcut to shutdown Linux just like Windows. Press Ctrl+Alt+K and your system is off. Please let me know if it worked for you in the comments.
