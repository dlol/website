---
title: "HTTPS pour des services LAN avec Caddy"
date: 2024-10-21T19:07:29+02:00
translationKey: "local-tls-caddy"
---

J'ai trouvé une manière simple d'utiliser mon reverse proxy, Caddy, pour génerer des certificats auto-signés pour des services que je n'expose pas à l'extérieur de mon réseau. Ceci m'assure que le trafic reste chiffré entre mon ordinateur et mon serveur, donc mon trafic ne peut pas être monitoré sur mon réseau local.

C'est assez simple d'arriver à le faire: prends le port du service local que tu veux sécuriser, par exemple `9898` (c'est une interface graphique web pour Restic). On doit simplement configurer Caddy afin qu'il devienne reverse proxy de ce service sur un autre port, dans ce cas j'ai choisi `9899` car c'est juste un port au dessus de `9898`.

```Caddyfile
:9899 {
    reverse_proxy localhost:9898
}
```

Maintenant tu peux accéder à ce service sur `<ip>:9899`. Maintenant pour ajouter le HTTPS tu dois juste utiliser la directive `tls` avec `internal` comme émisseur et la subdirective `on_demand`. La subdirective `on_demand` corrige une erreur sur mon navigateur que disait `SSL_ERROR_INTERNAL_ERROR_ALERT`, cépendant ***il ne faut pas*** utiliser `on_demand` pour des services externes.

```Caddyfile
:9899 {
    reverse_proxy localhost:9898
    tls internal {
        on_demand
    }
}
```

Il y aura quelques services qui pourront nécessiter d'un peu de bidouillage. L'interface Web de qBittorrent, par exemple, donne une erreur « 401 » si on ne désactive pas la « host header validation, » mais la plupart des services devraient fonctionner correctement.

Voilà, la seule chose que tu devras savoir c'est qu'il faut spécifier `https://` comme protocole lors de l'accès depuis les ports HTTPS spécifiés sur Caddy et qu'il faudra accepter le certificat auto-signé.
