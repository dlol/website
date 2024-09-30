#!/bin/sh

rm -rf public
hugo --gc --minify
rsync -azv --delete public/ root@triton:/var/www/konakona.moe/
