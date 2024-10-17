---
title: "My frustrations with Linux on the desktop"
date: 2024-10-16T15:34:57+02:00
# translationKey: ""
---

I've been messing with Linux since the middle of 2020. I started making a Minecraft server for me and some friends, and that spiraled into me being obsessed with servers and self-hosting.

Using Linux on the server eventually brought me into using it in the desktop but unfortunately I have had some mixed results and I want to talk about the bad things that I have encountered.

Throughout these 4 years, I have used a lot of distros, some "easier" and some "harder", while always avoiding mainstream programs like GNOME (GNOME as the most popular, stable DE. I still used KDE and other DEs). I've always tried to do things the autistic, masochistic way even when using a DE like KDE, because for me, that’s what Linux is about: Why would I go my way out to use a different OS with less features and desktop environment? Using Linux like this, for me, is just using a shittier version of Windows with less software support, that's why I've always liked, and still do sometimes tinker with window managers when using Linux.

I have tinkered a lot, meaning that I allow myself to write this because I know or I think I know what I am talking about.

## File Management

One of the first issues that I have with Linux is file management, and I mean GUI file managers. There are way too many GUI file managers on Linux that do exactly that same things but poorly, at the least compared to `explorer.exe` on Windows.

- Most of these file managers are based on Qt or GTK meaning they all look the same, and this is bad for a reason that I'll take about later (which is the theming by the way.)

- A big difference from Finder on macOS and explorer on Windows is that Linux file managers
	
    - Don’t remember your folder-specific settings: maybe you wanted to sort items by their modification date in an specific folder, well now every single folder you go through will sort the same way. macOS has .DS_Store files and Windows `.ini` files to remember folder settings.
	
	- Almost every file manager has some different backend for thumbnail generation which is a mess and doesn't work for all files without tinkering which is time wasting
	
	- Can someone please explain why do some file managers store bookmarks on `.config/gtk-whatever-version`?
	
	- Maybe because each app has a different file picker implementation that needs to see bookmarks? Well whatever because most of them are ugly: I'm pretty sure that Firefox uses GTK3 while telegram would use a Qt file picker. There's no concistency! It's worse than Windows.
	
- Don't get me started on terminal file managers, I think that terminal file managers are a gimmick, nice to have, sometimes, but I'd rather just use the standard Unix utils if I'm on my terminal, and there are no thumbnails, only an optional per file preview. Setting it up is also annoying: Do you have a suckless terminal (st)? Well I guess you're stuck with *üeberzug*, decided to install something like Kitty? Well then now you have to work with its weird image protocol.

Now, there is one feature that I love about one file manager in particular, which is only present in Dolphin, the KDE's default file manager. A terminal embedded into the file manager. This terminal is really nice because I can look at my files visually while having access to a terminal that also follows me wherever I go in the GUI. But there's a problem, the terminal only works if you have Konsole installed. In my experience this terminal works awfully when using something like a Window Manager because of it being so tied into KDE, using Dolphin outside KDE also means that the theme will look awful, no matter what I did.

## Theming

I despise theming on Linux. Why? Because while half of the applications like the Window Manager, the bar and the terminal have simple config files that you can edit, the other half of your GUIs use Qt or GTK. If you use a Desktop Environment the story is different: everything GNOME uses GTK and KDE uses Qt. I've heard that GNOME devs don't want you poking around themeing it apart from dark/light modes, that takes away the Linux spirit of customization while KDE themes, and most other DE themes are awful unmaintained side projects that don't even really look good.

Still there are some good examples of Qt applications like KeePassXC that have a default light and dark themes, but most applications don't, meaning they still follow your global theme but global themes on Qt and GTK are garbage.

> ### Quote from the catppuccin GTK port
>GTK, while being one of our most popular ports, can only be described as a nightmare to consistently theme and maintain. To understand why this port has been archived, please see [#262](https://github.com/catppuccin/gtk/issues/262).

Whoops, GTK got discontinued in one very popular color palette. There's also the versioning problem of GTK, there's 1, 2 ,3, 4 probably 5 by now which means is that even if you got it right, it probably won't look right on older versions or maybe you want your GTK and Qt themes to look alike, well good luck lol it's awful. I for one gave up on theming my GUI applications while using Linux a while back and just went with the standard Adwaita theme and the default Qt dark theme.

I thought that by using KDE Plasma, my experience in theming all applications would be easier than doing so on my suckless dwm "minimalistic stack" because KDE is a full blown DE with GUIs for everything but nope the GTK theming menu thing wasn't even working.

Linux users often criticize Windows for lacking consistency but try mixing GTK windows with Qt windows, no wonder why some people just live in the terminal, to have concistency between GTK and Qt windows on an window manager one needs to download qt5ct or 6? I don't think anyone knows the difference, then lxappearance(-gtk3) that was made for lxde, download some gtk2 package that probably wasn't updated for 6 years from the AUR only to the windows looking Mid.

What I am noticing is that if you want to use GTK themes and applications and have them look OKish is to use GNOME (and using Qt applications on KDE and so on,) but I never used GNOME, it's not that I don't want to use GNOME, it's more like I don't want to use Linux on the desktop altogether anymore...

## Display Managers

Display managers are the login screens of Linux there are many to choose from like GDM, SDDM, even `ly` which is a display manager that runs on the console but they all suck.

What display managers do, as far as I know, is spawning an X.org session running as root with the GUI, usually on TTY 1 or 7 when you first boot into your computer. This is already weird for me, what's more weird is that when you actually log in you can't kill the X.org server without `sudo` because it's root that spawned it, switching back to the TTY where the display manager was spawned only gives you a blank, black screen revealing your awful LCD backlight bleeding.

Of course there's nothing preventing you from not using a display manager, that's exactly what I do when using my dwm "stack", my "display manager" is nothing more than a, `if` statement inside the first lines of my `.zshrc`, but when I use a desktop environment and want things to "just work" reminding myself of this it sucks.

```shell
# startx command if tty = 1
if [ -z "$DISPLAY" ] && [ "$(tty)" = /dev/tty1 ]; then
	startx && exit
fi
```

There's also the finicky lock screens of Xorg which are just full screen windows that grab your keyboard and mouse, which is a hack solution that Wayland apparently fixed but honestly I haven't noticed any visual glitches that sometimes happen when you wake your pc from sleeping when using the lock screens offered by some desktop environments, but that's probably because I use the very minimal `slock` by suckless.

## Package Management

This one will be quick: I hate flatpaks, I hate snaps, I hate anything that isn't the standard way of doing things.

That's why the only package managers that matter are probably pacman, portage and apt? well not only the package manager but also the repositories, I've heard you can install anything with Gentoo's portage and I know you can install literally anything on arch with the AUR.

These "universal" package managers only exist to remedy a problem that Debian and probably RHEL created: they don't have many packages or they are all out of date (also why do people actually unironically use Debian on the desktop) and most people eat that shit up thinking its going to fix Linux, It won't.

><h3 style="margin-top: 0;">Update</h3>
>Honestly I wrote this a while back and I don't care anymore about this section, sandboxing applications sounds nice if there's no overhead especially for proprietary and even some lesser known open source stuff. Backdooring an application takes few lines of code, open source doesn't automatically makes something better, just look at the `xz` fiasco. Nothing is perfect frankly and uhm if it works it works.

## Making my friend's lives miserable

I have some friends that just refuse to buy anything digital, however playing pirated games on Linux is just awful its a hit or miss for most installers and for multiplayer games, not only is it a hit or miss just for installing the damn thing but its also very finicky and annoying which well makes me look like a fucking idiot around my friends.

I have bought most of the games that I really really love, however don't expect me to pay for every single multiplayer game we will ever play, specially given that we play for a few hours or days and forget about it later.

Gaming will always be a windows thing: anti cheats don't usually work on Linux too so theres that.

## Esoteric devices

This one isn't a deal breaker for Linux but more like something really annoying that happened to me.

So I have the Xbox Controller dongle microsoft thingy for my controller. To use it on Linux I had to download some random git repo and compile the drivers from source, pretty standard stuff, at the least for me, I am used to that.

However I don't play a lot of games, when I'm on Linux and time passes as some day I decided to play something and well the drivers broke because I had to update my kernel some days before. 

Thankfully someone else running Arch opened an issue on the git repo of the driver and I was able to follow the instructions to fix my drivers, I think some version number inside the source code had to be updated if I recall correctly.

It sure is annoying and something that I don't want to deal with, specially considering that plugging this same dongle on windows just works and I don't want to worry about is my controller going to work when i'm just trying to play a game.

Maybe it was MS smiting me for ever thinking of plugging their stupid 30€ dongle on Linux.

## Conclusion

I hope I haven't upset you Linux people off that much, because I really do love using Linux on the server and sometimes I just get bored out of Windows or Mac and just want to install Linux and tinker a bit, there's something really soothing about installing suckless applications or maybe I just like torturing myself.

I am also considering trying out Gnome on probably for an HTPC so I'll probably get a proper taste of it.

I feel like everything sucks in their own way, nothing is perfect, hating Windows and or Mac is a waste of time, it doesn't make you special, it really just ends up with people looking at your weird, use what works for you and stop forcing your slop on people because the more your force it the less they are likely to want to switch specially when it takes like 20 minutes to debloat windows with PowerShell scripts.
