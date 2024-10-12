---
title: "Using Obsidian with iCloud"
date: 2024-10-03T17:02:19+02:00
# translationKey: ""
---

I started college and I needed a note taking app. Because I bought a MacBook, I thought that Apple Notes would be okay, but I also have a PC and using Apple Notes on the web browser is awful. Apple Notes, as far as I know, doesn't support code fences which I need for code snippets. Paying for Obsidian is probably convenient however their markup is insane. 

### Tutorial

First, create a new Obsidian vault on your iPhone choosing iCloud. The vault will be located on `<ICLOUD>/Obsidian/<vault-name>`, you can see it in the default Files app. We won't use this though, because I (and I'm assuming you) already have a Vault. The reason why I did this was to make sure the Obisidian folder would be generated inside iCloud in the first place.

Okay, now download iCloud on Windows and paste your actual vault inside `<ICLOUD>/Obsidian/`, or do it on a Mac, it already has iCloud integrated.

How do I mount my iCloud on Linux? I don't know. I don't use Linux on the desktop I don't think Apple gives API access to iCloud. If `rclone` [doesn't have an option for iCloud](https://forum.rclone.org/t/no-icloud-yet-what-takes-them-so-long/44925), you're probably borked if you're on Linux.

> **Warning: Before Opening**
>
>Before you paste and start editing your vault, wait for other files to sync first, **ESPECIALLY** on Windows because Apple treats PC users like garbage. Always have a backup, of course!

Now open the vault on Obsidian on your iPhone, Mac or PC!
