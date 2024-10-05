---
title: "Arquivando canais do YouTube"
date: 2024-10-04T11:16:50+02:00
# translationKey: ""
---

Se você explorou o meu site e leu o meu sobre, você provavelmente viu que eu falei vagamente sobre o fato que eu gosto de arquivagem. Então hoje eu quero apresentar esse hobby em prática mostrando algumas coisas que eu arquivei: canais inteiros do youtube que eu gosto.

Você já provavelmente ouviu falar do Wayback Machine ou "o site que te permite de ver como um outro site era em tal data", mas o que provavelmente a maioria das pessoas não sabe é que este site também permite as pessoas a arquivar arquivos normais sem limites de armazenamento, a única restrição é que tudo que você coloca no site é público, e que os uploads são extremamente lentos. (~3 Mb/s na minha connecção que é gigabit.)

*Algum autista poderia enviar arquivos criptografados e usar esse serviço como armazenamento infinito, até o serviço descobrir esses ficheiros spam e os excluir...*

Anyway, o meu perfil no [archive.org](https://archive.org) é [SHATTEREDP](https://archive.org/details/@shatteredp) e eu já fiz o upload de alguns canais incluindo o *Viniccius13* e o *ForeverPlayer* por exemplo, assim como um outro canal inglês de GTA e eu vou tentar manter a maioria desses arquivos atualizados a cada novo upload.

## Como?

Eu uso o `yt-dlp` para baixar milhares de vídeos do youtube e outras plataformas: é uma utilidade de linha de comando escrita em Python que te permite baixar de vídeos de quase qualquer site da internet que não implementa DRM.

Mais especificamente eu uso um script "wrapper" para arquivar canais inteiros do youtube, com a qualidade mais alta possível, sempre.

[Aqui está o script](https://github.com/TheFrenchGhosty/TheFrenchGhostys-Ultimate-YouTube-DL-Scripts-Collection/tree/master/scripts/Archivist%20Scripts/Archivist%20Scripts%20(No%20Comments)/Channels).

## Mas por que?

Deve ter um ano atrás em que um copyright troll quase deletou o canal do Viniccius13. É certo que um canal tão grande quanto o do Viniccius provavelmente teria o seus vídeos retornados, mas isso também não impediria um outro YouTuber de simplesmente desaparecer, levando todos os seus vídeos, como foi o caso do *AstroSoup*, um canal sobre GTA Online que simplesmente desapareceu sem deixar razão nenhuma. Alguns vídeos dele foram reupados mas em baixa qualidade mas muitos foram perdidos infelizmente.

Arquivar esses vídeos quando eles acabam de sair também permite de salvar o vídeo no estado original, por exemplo, ter uma cópia dos videos antes deles terem sidos censurados, ou também guardar as músicas dos vídeos, já que às vezes os youtubers tiram a música usada no seus videos por causa de algum Content ID e a qualidade do áudio durante as partes onde o áudio foi removido fica horrível.
