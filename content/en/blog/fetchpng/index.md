---
title: "How to Dump Neofetch Output into an Image"
date: 2024-03-09T02:44:00+01:00
---

I thought it was cool to have a cron job on my server "dumping" the neofetch output into an image ever so often. This way I could link this image on my website to show off my server status.

I found that the simplest solution to this, was to use [`ansilove`](https://www.ansilove.org/).

Here is the result:

![Fetch](https://konakona.moe/fetch.png)

```sh
#!/bin/sh

temp=$(mktemp)
header="Generated on $(date +"%Y-%m-%d %H:%M %Z")"
location="/var/www/konakona/fetch.png"

printf "%s\n" "$header" >> "$temp"
neofetch >> "$temp"

rm "$location"
ansilove -o "$location" "$temp"
rm $temp
```

After copying this script, edit it changing the header text and the location of where you want to save the image, I like saving the image on the root of my website, so I can easily link it here. Set it as an executable file with `chmod +x fetchpng` and copy it to your `$PATH`, for example to `/usr/local/bin/`.

Now of course make sure to download `ansilove` and `neofetch`.

Make a new cron job. I like using the root user here so I'm 100% certain that the image will be generated into that directory.

`sudo crontab -eu root`
```sh
*/10 * * * * /usr/local/bin/fetchpng # 10 minute example
```

> Note: I like uploading my site with rsync, so I have to add some exclusions so that it doesn't exclude this image when I'm uploading my site
>
> This can be done with the `--exclude='fetch.png'` flag.
