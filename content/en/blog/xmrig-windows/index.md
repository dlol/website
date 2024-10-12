---
title: "XMRig Idle Background Mining on Windows"
date: 2024-03-20T20:29:08+01:00
---

I found a way you can use your computer to mine cypto using xmrig when it goes idle. I used the `--pause-on-active=N` flag to achieve this, but sadly, as far as I know, this only works on Windows, as it uses some API specific to this OS to detect if the computer has gone idle.

## Download xmrig

You can download xmrig here: [https://xmrig.com/download](https://xmrig.com/download)

Note that Windows Defender will probably warn you when you unzip it. You can make a folder and disable scanning on it inside Windows Defender.

You will see a bunch of files, but the only ones you will need are `xmrig.exe` and `WinRing0x64.sys` which you will have to copy somewhere, like your `C:\` drive or something, let me repeat `WinRing0x64.sys` has to be in the same folder as the xmrig executable, preferably in your `$PATH` although not really necessary. Having it on the `$PATH` means that you can access it anywhere with PowerShell or CMD with your terminal emulator.

{{< img src="image-5.png" width="auto" >}}

### Adding xmrig to your PATH (optional)

If you want to add it to your PATH varibale, create a "cliprograms" folder in your `C:\` drive for example, drop these two files in there, then press `Win + R` and type `systempropertiesadvanced.exe`, hit enter. Go to `Taskbar > Environment Variables`, and finally edit the `$PATH` variable with this folder, new terminals should be able to locate xmrig.

{{< img src="image.png" width="100%" >}}

<br>

## Creating a new Task on Task Scheduler

Okay, now we can actually start "daemonizing" xmrig on Windows. Does Windows even call these daemons?

{{< img src="image-2.png" width="100%" >}}

1. Open Task Scheduler by pressing `Win + R`, typing `taskschd.msc` and hitting enter.
2. Click on Task Scheduler Library
3. Create Task...

Now a wizard will pop up. You could see on my screenshots that I have already created my task, so just copy and paste what I did, making modifications to your liking.

### General

{{< img src="image-1.png" width="632px" >}}

1. Give it a Name
2. Check run with highest privileges

### Triggers

{{< img src="image-3.png" width="100%" >}}

1. Click new
2. Select "At log on" (*and not at startup, I tried and it didn't work*)
3. Specific user, then select your user if it's not already you

### Actions

{{< img src="image-4.png" width="90%" >}}

1. Action: Start a program
2. Select the path to xmrig, paste it or browse
3. Add the arguments:
    1. `-B` - Background mining, the CLI won't pop up 
    2. `--pause-on-active 50` - xmrig will only mine when your PC is idle for 50 seconds
    3. Other arguments such as mining pool, threads, difficulty, etc.

That's basically it, I didn't bother messing with other settings but nothing is keeping you from doing so. You can try running the task and seeing if everything works, rebooting to see if it starts up, removing the `-B` flag so it starts with a terminal window allowing you to see if it starts with admin permissions or if it starts at all.
