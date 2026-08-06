# Backend (faux serveur d'API REST)

Ce dossier contient un **faux serveur d'API REST**, comme suggéré dans l'énoncé du projet.
On utilise l'outil `json-server`, qui transforme un simple fichier `db.json` en une vraie petite API REST,
avec les routes `GET`, `POST`, `PUT`, `PATCH` et `DELETE`.

## Installation

```bash
cd backend
npm install
```

## Lancer le serveur

```bash
npm start
```

Le serveur démarre sur : http://localhost:3001

Deux collections sont disponibles :

- `http://localhost:3001/utilisateurs` → les comptes (inscription / connexion)
- `http://localhost:3001/elements` → les compétences et projets de chaque utilisateur

## Comptes de démonstration

| Email               | Mot de passe |
|----------------------|--------------|
| abdou@portfolio.sn   | abdou123        |

Tu peux aussi créer un nouveau compte directement depuis l'application (page "Créer un compte").

> Remarque : ce backend est **factice**, fait uniquement pour le projet. Les mots de passe sont stockés
> en clair dans `db.json`, ce qu'on ne ferait jamais dans une vraie application (il faudrait les hacher
> et utiliser un vrai serveur avec une vraie base de données).
