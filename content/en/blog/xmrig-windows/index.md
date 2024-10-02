---
title: "XMRig Idle Background Mining on Windows"
date: 2024-03-20T20:29:08+01:00
---

I found a way you can use your computer to mine with XMRig when it goes idle, sadly, as far as I know, this only works on Windows. It uses the `--pause-on-active=N` flag, `N` of course being a number, in seconds. XMRig will automatically start mining when you leave your computer idling, something that I do all the time.

## Download xmrig

You can download xmrig here: [https://xmrig.com/download](https://xmrig.com/download)

Note that Windows Defender will probably warn you when you unzip it. You can make a folder and disable scanning on that folder inside Windows Defender.

You will see a bunch of files but the only ones you will need are `xmrig.exe` and `WinRing0x64.sys` which you will have to copy somewhere, like your `C:\` drive or something, let me repeat `WinRing0x64.sys` has to be in the same folder as the xmrig executable, preferably in your `$PATH` although not really necessary, it's nice because you can access it through anywhere with PowerShell or CMD with your terminal emulator.

{{< img src="image-5.png" width="auto" >}}

If you want to, create "cliprograms" folder ay the root of your `C:\` drive for example and drop these two files in there, then `Win+R` and type `systempropertiesadvanced.exe` and press enter or just search "path" on the search bar, on the `taskbar > environment variables` and you add the folder you chose, you know what do to, if you don't well just Google "how to add folders to PATH windows".

{{< img src="image.png" width="100%" >}}

<br>

## Creating a new Task on Task Scheduler

Okay, now we can actually start "daemonizing" xmrig on Windows. Does Windows even call these daemons?

{{< img src="image-2.png" width="100%" >}}

1. Open Task Scheduler by searching on the taskbar or `Win+R`, type `taskschd.msc` and press enter.
2. Click on Task Scheduler Library
3. Create Task...

Now a wizard will pop up. You could see on my screenshot that I have created mine already so just copy and paste what I did, making modifications to your liking.

### General

{{< img src="image-1.png" width="632px" >}}

1. Give it a Name
2. Check run with highest privileges

### Triggers

{{< img src="image-3.png" width="100%" >}}

1. Click new
2. Select "At log on" (and not at startup, I tried and it didn't work)
3. Specific user, then selection your user if it's not already you

### Actions

{{< img src="image-4.png" width="90%" >}}

1. Action: Start a program
2. Select the path to xmrig, paste it or browse
3. Add the arguments:
    1. `-B` - Background mining, the CLI won't pop up 
    2. `--pause-on-active 50` - xmrig will only mine when your PC is idle
    3. All the rest of arguments you use (mining pool, threads, etc.)

That's basically it, I didn't bother messing with other settings but nothing is keeping you from doing it. You can try running the task and seeing if everything works, rebooting to see if it starts up, removing the `-B` flag to see if it starts with admin permissions or if it starts at all.
