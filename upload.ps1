Remove-Item -Recurse -Force public
hugo --gc --minify
wsl -e rsync -azv --delete --exclude='traffic.png' --exclude='fetch.png' public/ root@triton:/var/www/konakona.moe/
