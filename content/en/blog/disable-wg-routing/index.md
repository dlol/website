---
title: "How to Disable Routing for Wireguard Interfaces"
date: 2024-02-20T18:40:31+01:00
---

This was part of my qBittorrent-nox guide but I've slitted it up.

To make WireGuard not route all traffic through it, you'll need to edit your config files. By following this guide you will be leaving the WireGuard interface as just another network interface you can *optionally* bind to, think of Wi-Fi and Ethernet interfaces, depending on the application you can just select which one you are going to use. What's cooler is that, even if your server already acts like a WireGuard server, like mine does, you're still going to be able to use WireGuard as a client. To do this...

Leave `AllowedIPs=` as is `(0.0.0.0/0)`.

Add `Table = off` below `[Interface]`. This will allow you to split tunnel the traffic.

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

Now you could just chmod 660 or 640 this config file to make it safer. (Make sure it's owned by root!)

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

--

Thanks to this blog post: <https://shibumi.dev/posts/disable-routing-for-wireguard/>
