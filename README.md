# Lord of Dungeons API 🦖

## Prérequis 🔧

- Node 14.x.x
- NPM / Yarn
- MySQL 8.x.x
- Nodemon en global (`npm install --global nodemon`)
- TS-NODE en global (`npm install --global ts-node`)
- Base de données MySQL nommée `lord_of_dungeons` en `utf8_general_ci`

## Installation 🔄

```
git clone <projet>
```

```
cd <projet>
```

```
yarn
```

➔ Renseigner les informations d'environnement dans un fichier `.env` à la racine du projet.

➔ Ajouter le fichier `private.key` à la racine du projet.

## Synchroniser la base de données 💾

```
yarn migration:run
```

## Lancement en développement 🚀

```
yarn dev
```
