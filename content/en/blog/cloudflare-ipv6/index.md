---
title: "How to Disable IPv6 Support on Cloudflare"
date: 2024-04-12T19:04:06+02:00
---

Cloudflare makes it a chore to disable IPv6 support on their edge servers, you can't just flick the switch on the dashboard, which is annoying. Probably because "muh ipv4 exhaustion!!" (My friends at the GC's R&D division have a pretty simple solution for this issue however.)

{{< img src="4zqi9nln.bmp" width="70%" og=false >}}

^It's normally switched on but you can't flick it off, but we can use the Cloudflare's API for that, here's an example:

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

- To get your email go to your profile <https://dash.cloudflare.com/profile>
- To get your global API key go here: <https://dash.cloudflare.com/profile/api-tokens>
- The zoneid is the id of your domain(s), click on it and scroll down looking at the right of the screen

*Note*: You'll have to rerun this command if you have other domains, but I think that's obvious.
