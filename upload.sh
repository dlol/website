#!/bin/sh

rm -rf public
hugo --gc --minify
rsync -azv --chown caddy:caddy --chmod 755 --delete public/ root@triton:/var/www/konakona.moe/
