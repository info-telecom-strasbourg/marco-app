# Marco Mobile

## Guide d'installation 

### Prérequis 

Afin de pouvoir faire fonctionner l'application sur un téléphone depuis son ordinateur, il est nécessaire d'avoir aupararavant installé : 

    - [NVM](https://github.com/nvm-sh/nvm)
    - OpenJDK
    - PHP version [8.1 à 8.3](https://www.php.net/downloads.php?os=linux&osvariant=linux-ubuntu&version=8.2)
    - [adb](https://developer.android.com/tools/adb?hl=fr)
    - [Docker](https://docs.docker.com/engine/install/ubuntu/) (optionnel mais recommandé)
    - Le [Back-End]() de InsidePSBS
    - [FouailleManager](https://github.com/info-telecom-strasbourg/site-gestion-fouaille/)

## Configuration de l'environnement

### Extensions PHP

Par défaut à l'installation, les extensions PHP sont désactivées. Pour que le projet fonctionne correctement, allez dans le dossier de php.
```bash
whereis php
cd [path_to_php]
```
Ouvrez le fichier php.ini, et vérifiez que les extensions suivantes sont activées : 
    - curl
    - fileinfo
    - mbstring
    - openssl
    - pdo_mysql
    - zip

### Configuration docker

Docker facilite l'accès aux bases de données des back-end de la Marco Mobile et de Fouaille Manager. 
Il est possible de passer par deux bases instances différentes, mais il est recommandé de passer par la même base de donnée pour les deux back-ends afin d'éviter d'éventuels problèmes de synchonisation. 

Quelques commandes utiles au démarrage : 

```bash
# Donner les droits d'utilisation de docker (peut résoudre des erreurs de permissions)
sudo usermod -a -G docker [username]

# Créer les instances docker : 
docker run --name [db_name]   -e MYSQL_ROOT_PASSWORD=[password]   -e MYSQL_DATABASE=[database]   -p 3306:3306   -d mysql:latest

# Créer/recréer/démarrer les instances docker
docker compose up -d

# Vérifier les instances docker démarrées 
docker ps

# Lancer une instance précise 
docker start [docker_id | docker_name]
```
### configuration des back-end

La configuration des back-ends suivent leurs Readme respectifs. Cependant les deux backend tournent par défaut sur le port 8000. Il est nécessaire de redéfinir le port d'un des deux projets :

```bash
# back-end de InsidePSBS
php artisan serve --host="0.0.0.0"

# back-end de FouailleManager
php artisan serve --host="0.0.0.0" --port=8888
```
### configuration du projet

Le projet de la Marco Mobile nécessite plusieurs dépendances (ReactJS, ReactNative, TypeScript, Expo,...).

```bash
# installation des dépendances
npm install

# démarrer le projet 
# note : --tunnel n'est pas obligatoire, mais évite que la connexion échoue
npm expo start --tunnel
```

Le serveur est lancé via Expo. Les commandes sont marquées dans le terminal. 

## Debug des APIs 

Il est possible d'appeler directement les routes pour vérifier leurs fonctionnement : 

```bash
curl -H "Content-Type: application/json" [-d {post_json}] [PATH_TO_API]
```