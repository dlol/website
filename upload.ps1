Remove-Item -Recurse -Force public
hugo --gc --minify
wsl -e rsync -azv --chown caddy:caddy --chmod 755 --delete public/ root@triton:/var/www/konakona.moe/
