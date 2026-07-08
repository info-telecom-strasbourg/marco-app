# Fonctionnement de MarcoMobile

## Intéractions avec le système actuel (MarcoNEO)

Ce projet visant à être testé en parallèle du système actuel, il est nécessaire que les deux systèmes ne modifient pas le comportement existant afin de ne pas casser la structure en place.
Afin de respecter ce principe, le projet MarcoMobile ne nécessite aucun changement dans le projet MarcoNEO et toutes les modifications du côté de l'API ne font qu'étendre le comportement actuel. Un champ supplémentaire dans le modèle des commandes permet de détecter si une commande a été faite depuis le nouveau système et il est possible d'intégrer les nouvelles fonctionnalités sur ces données.

### Du point de vue de MarcoNEO

Tout fonctionne toujours de la même façon. Chaque panier est constitué de plusieurs articles qui sont l'un après l'autre envoyés au serveur.
Fouaille Manager, un projet lié à MarcoNEO, continue de lire toutes les lignes individuellement pour générer les rapports en fin de soirées.

### Du point de vue de MarcoMobile

Les commandes générées par MarcoMobile sont envoyées de la même façon que sur MarcoNEO en ajoutant un identifiant en plus. Cet identifiant, présent sur une ou plusieurs lignes, permet d'identifier le panier et d'afficher ses informations.

MarcoMobile ne pouvant envoyer que des commandes avec l'identifiant supplémentaire, on peut directement exclure les enregistrements sans identifiants pour l'affichage spécifique.
