#!/bin/sh

rm -rf public
hugo --gc --minify
rsync -azv --delete --exclude='traffic.png' --exclude='fetch.png' public/ root@triton:/var/www/konakona.moe/
