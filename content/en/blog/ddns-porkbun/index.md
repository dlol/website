---
title: "Dynamic DNS with a Single Bash Script using Porkbun's API"
date: 2024-01-31T16:24:31+01:00
---

This tutorial is about a very simple bash script that I have made to update my DNS records on my registrar (porkbun). It is a showcase of that you don't need an account on no-ip or whatever other ddns service. This script works, in particular with [Porkbun](https://porkbun.com) but if you've found my website, it probably means that you can take this as inspiration and use it with the API of another registrar.

It's funny that my ISP offers static IPs... for +36€ a month... I defeated that with a 27 SLOC bash script.

## The Script

```bash
#!/bin/sh

# This script will grab your ip from an IP api and push it to the porkbun API
# It was recommended to set the cronjob to whatever your TTL is.
#
# Example cronjob for a 600 seconds TTL:
# */10 * * * * porkbun-ddns

domain="konakona.moe" # The domain name
subdomain=""          # The subdomain, yes you can leave it blank, see below CNAMEs
secretapikey=""       # Your secret API key
apikey=""             # The API key, no idea why they split it in two
ipapi="ip.me"         # A particular website that will return your IP(v4) as plain text if you curl it
cachefile="/root/.ddns-cache" # A file, where your IP will be cached

ip=$(curl -s4 $ipapi) # Gets your ip

if [ -z "$ip" ]; then # If there was an error, exit
    echo "Error getting IP."
    exit 1
fi

if [ -f "$cachefile" ]; then # If the cache file exists read it
    read -r cachedip < "$cachefile"
fi

# Only exec if the IP != to the ip in the cache file or if the file doesn't exist
if [ "$ip" != "$cachedip" ] || [ -z "$cachedip" ]; then
    echo "$ip" > "$cachefile" # Cache the IP

    # Push the new IP to Porkbun, docs see below
    curl -X POST -H "Content-Type: application/json" -d "{
        \"secretapikey\": \"$secretapikey\",
        \"apikey\": \"$apikey\",
        \"content\": \"$ip\",
        \"ttl\": \"600\"
    }" https://porkbun.com/api/json/v3/dns/editByNameType/"$domain"/A/"$subdomain"
    echo
else
    echo "Your IP has not changed."
fi
```

- If you are using Porkbun, you can create API keys here: <https://porkbun.com/account/api>.

- The API documentation is here: <https://porkbun.com/api/json/v3/documentation>.

- The particular API documentation that I used is here: [DNS Edit Record by Domain, Subdomain and Type](https://porkbun.com/api/json/v3/documentation#DNS%20Edit%20Record%20by%20Domain,%20Subdomain%20and%20Type)

## Using CNAMEs

You don't need to make copies of this script for each and every sub-domain that you are going to use if they are hosted on the same IP! In my case I just set up this script to push the new IPs on `konakona.moe` and CNAMEd everything else to it.

## Setting it up

After downloading the script with `wget` or something and editing it, make it executable with `chmod +x porkbun-ddns`, then copy it somewhere in your `$PATH`. I think `/usr/local/bin/` is the standard for scripts and random binaries like this.

Now you need to make a cronjob. As stated on the script, it was recommended that the cronjob's cycle to be set to whatever your domain's TTL is, in my case 600 seconds or 10 minutes:

`crontab -e`
```plain
*/10 * * * * /usr/local/bin/porkbun-ddns
```

## `chmod` and Change Owner

Maybe changing the mode of the script would be a good idea because it contains the credentials for Porkbun:

```shell
chmod 770 /usr/local/bin/porkbun-ddns
chown root:root /usr/local/bin/porkbun-ddns

# Now check
ls -laFh /usr/local/bin/porkbun-ddns
```

The output should be something like:

```plain
.rwxrwx--- root root 1.0 KB Sat Jan 27 23:35:29 2024 porkbun-ddns*
```

Happy self-hosting!
