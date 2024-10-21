---
title: "HTTPS for local services using Caddy"
date: 2024-10-21T19:07:29+02:00
# translationKey: ""
---

I have found a very simple way to use my reverse proxy, Caddy, to generate self-signed certificates for services that I don't expose externally. This ensures that my local HTTP traffic is encrypted between my computer and my homelab meaning that my traffic can't be monitored.

This is quite simple to achieve: take the port of local service you want to secure, like `9898` (a restic GUI running on my system). We simply need to configure Caddy to act as a reverse proxy for this service on another port, in this case I chose port `9899` because it's just one port higher than this.

```Caddyfile
:9899 {
    reverse_proxy localhost:9898
}
```

Now you can access this service through `<ip>:9999`. To add HTTPS you just need to use the `tls` directive with `internal` as the issuer and `on_demand` as the subdirective. The `on_demand` subdirective fixes an error I got on my browser saying `SSL_ERROR_INTERNAL_ERROR_ALERT` however ***do not*** use this for external services.

```Caddyfile
:9899 {
    reverse_proxy localhost:9898
    tls internal {
        on_demand
    }
}
```

Some services may require you to do extra work. qBittorrent's WebUI gives you a `401` error if you don't disable host header validation for example but most services should work just fine.

That's it, the only thing you should know is that you'll need to specify `https://` as the protocol when accessing from the HTTPS ports and that you must accept the self-signed certificate.
