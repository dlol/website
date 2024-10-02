---
title: "How to Dump Neofetch Output into an Image"
date: 2024-03-09T02:44:00+01:00
---

I thought it was a cool idea to have a cronjob on the server hosting my website "dump" the neofetch system status output into an image that I could use on my site, flexing that uptime and to have some more dynamic things on my static website.

I found that the simplest solution was to do this with a package called [`ansilove`](https://www.ansilove.org/). Here is the result:

![Fetch](https://konakona.moe/fetch.png)

You can also see this on the [About](/about/) section of my site.

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

After copying or downloading it, edit the script changing the location of where you want to save the image, and the header text if you want. Then set it as executable with `chmod +x fetchpng` and copy it to your `$PATH`, for example to `/usr/local/bin/`.

Now of course make sure to download `ansilove` and `neofetch`, which are both on the Debian 12 repository.

Now we need to add the cronjob, I like using the root user here so I'm 100% certain that the image will be generated into that directory.

`sudo crontab -eu root`
```sh
*/10 * * * * /usr/local/bin/fetchpng # 10 minute example
```

Now save it and you will have an usable image being generated each 10 minutes in the root of your website.

> Note: I like uploading my site with rsync, so I have to add some exclusions so that it doesn't exclude this image when I'm uploading my site
>
> This can be done with the `--exclude='fetch.png'` flag.
