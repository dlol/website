---
title: "How to Disable IPv6 Support on Cloudflare"
date: 2024-04-12T19:04:06+02:00
---

Cloudflare makes it a chore to disable IPv6 support on their edge servers, you can't just flick the switch on the dashboard without a subscription, which is annoying.

{{< img src="4zqi9nln.bmp" width="70%" og=false >}}

^This switch is normally switched on and you can't flick it off, however, for some reason Cloudflare lets you disable it via its API, here's an example:

## Using the API

```bash
curl --request PATCH \
        --header 'X-Auth-Email: YOUR_LOGIN_EMAIL' \
        --header 'X-Auth-Key: YOUR_GLOBAL_API_KEY' \
        --header 'Content-Type: application/json' \
        --data '{ 
            "value": "off"
    }' https://api.cloudflare.com/client/v4/zones/ZONE_ID_OF_YOUR_DOMAIN/settings/ipv6
```

- Get your email here (useful for email alias users): <https://dash.cloudflare.com/profile>
- Get your global API key here: <https://dash.cloudflare.com/profile/api-tokens>
- The `zoneid` is the id of your domain, click on it and scroll down looking at the right of the site

*Note*: You'll have to rerun this command if you have other domains, but I think that's obvious.
