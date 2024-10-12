---
title: "How to Disable Routing for Wireguard Interfaces"
date: 2024-02-20T18:40:31+01:00
---

I've learned that it's possible configure WireGuard as to not route everything through it. This enables me to use WireGuard just as another interface that I can *optionally* bind to, like separate Wi-Fi and Ethernet interfaces in the same computer, but this time with a different IP. The possibilities are probably endless.

## Tutorial 

Leave `AllowedIPs=` as is `(0.0.0.0/0)`.

Add `Table = off` below `[Interface]`. This will allow you to split tunnel the traffic. That's all you have to do!

`/etc/wireguard/<your-wg-conf>.conf`
```ini
[Interface]
PrivateKey = <REDACTED>
Address = 10.8.0.3/24
DNS = 1.1.1.1, 9.9.9.9
Table = off

[Peer]
PublicKey = <REDACTED>
PresharedKey = <REDACTED>
AllowedIPs = 0.0.0.0/0
Endpoint = <IP>:51820
PersistentKeepalive = 60
```

Now `chmod 660 or 640` this config file and `chown root` it.

```plain
chmod 640 /etc/wireguard/<your-wg-conf>.conf
```

Now you can now connect to WireGuard. (Do not add .conf to the end)

```plain
wg-quick up <your-wg-conf>
# or if you want to connect to wg on boot:
systemctl enable --now wg-quick@<your-wg-conf>
```

You can now test if the WireGuard network interface is working.

```plain
ifconfig
curl ip.me
curl --interface <your-wg-conf> ip.me
```

Thanks to this blog post: <https://shibumi.dev/posts/disable-routing-for-wireguard/>
