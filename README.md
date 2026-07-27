# Marco Mobile

Plateforme de commande pour les soirées Fouaille à Telecom Physique Strasbourg (TPS)

## Installation

Cette étape part du principe que vous avez installé le SDK Android ou iOS selon votre plateforme. Cette étape n'est pas couverte par ce guide.
Une fois les sources téléchargées, téléchargez les dépendances à l'aide de:
```bash
# installation des dépendances
npm install
```

### Développement

Ce projet a besoin de plusieurs APIs externes pour son bon fonctionnement.
Le service d'authentification est géré par [InsidePSBS](https://github.com/info-telecom-strasbourg/appTPS-website) et les données du Fouaille sont gérées par Fouaille Manager (https://github.com/info-telecom-strasbourg/site-gestion-fouaille).

Une fois les deux projets installées, mettez à jour le .env.example en le renommant .env et en modifiant les variables pour mettre les bonnes informations.

```bash
# démarrer le projet 
nmp start

# note : En cas d'erreur au chargement, passer par cette comande peut débloquer la situation
npx expo start --tunnel
```

Le serveur est lancé via Expo. Les commandes sont marquées dans le terminal. 
