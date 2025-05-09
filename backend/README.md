# Backend Afrigro - Marché en ligne

Ce projet est le backend d'une application de marché en ligne, développé avec Node.js et SQLite.

## Structure du projet

Le projet suit l'architecture MVC (Model-View-Controller) :

```
backend/
├── config/                 # Configuration (base de données, environnement)
├── controllers/            # Logique métier
├── models/                 # Modèles de données
├── routes/                 # Définition des routes API
├── middlewares/            # Middlewares (authentification, validation)
├── utils/                  # Fonctions utilitaires
├── database/               # Migrations et seeds
├── uploads/                # Stockage des fichiers uploadés
├── tests/                  # Tests unitaires et d'intégration
├── app.js                  # Point d'entrée de l'application
├── server.js               # Configuration du serveur
└── package.json            # Dépendances
```

## Fonctionnalités

- **Gestion des utilisateurs** : Inscription, connexion, gestion de profil
- **Gestion des produits** : Ajout, modification, suppression, recherche
- **Gestion des catégories** : Organisation des produits par catégories
- **Gestion des commandes** : Création et suivi des commandes
- **Système de notation** : Avis et évaluations des produits

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express** : Framework web pour Node.js
- **Sequelize** : ORM pour la gestion de la base de données
- **SQLite** : Base de données légère
- **JWT** : Authentification basée sur les tokens
- **Bcrypt** : Hachage des mots de passe
- **Multer** : Gestion des uploads de fichiers

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```
   npm install
   ```
3. Configurer les variables d'environnement (voir le fichier `.env.example`)
4. Démarrer le serveur :
   ```
   npm run dev
   ```

## API Endpoints

### Utilisateurs
- `POST /api/users/register` : Inscription
- `POST /api/users/login` : Connexion
- `GET /api/users/profile` : Profil utilisateur
- `PUT /api/users/profile` : Mise à jour du profil
- `PUT /api/users/password` : Changement de mot de passe

### Catégories
- `GET /api/categories` : Liste des catégories
- `GET /api/categories/:id` : Détails d'une catégorie
- `GET /api/categories/:id/products` : Produits d'une catégorie
- `POST /api/categories` : Création d'une catégorie (admin)
- `PUT /api/categories/:id` : Mise à jour d'une catégorie (admin)
- `DELETE /api/categories/:id` : Suppression d'une catégorie (admin)

### Produits
- `GET /api/products` : Liste des produits
- `GET /api/products/search` : Recherche de produits
- `GET /api/products/:id` : Détails d'un produit
- `POST /api/products` : Création d'un produit
- `PUT /api/products/:id` : Mise à jour d'un produit
- `DELETE /api/products/:id` : Suppression d'un produit

### Commandes
- `POST /api/orders` : Création d'une commande
- `GET /api/orders` : Liste des commandes de l'utilisateur
- `GET /api/orders/:id` : Détails d'une commande
- `PUT /api/orders/:id/cancel` : Annulation d'une commande
- `GET /api/orders/admin/all` : Liste de toutes les commandes (admin)
- `PUT /api/orders/:id/status` : Mise à jour du statut d'une commande (admin)
- `PUT /api/orders/:id/payment` : Mise à jour du statut de paiement (admin)

### Avis
- `GET /api/reviews/product/:productId` : Avis sur un produit
- `GET /api/reviews/:id` : Détails d'un avis
- `POST /api/reviews` : Création d'un avis
- `GET /api/reviews/user/me` : Avis de l'utilisateur
- `PUT /api/reviews/:id` : Mise à jour d'un avis
- `DELETE /api/reviews/:id` : Suppression d'un avis

## Licence

Ce projet est sous licence MIT.
