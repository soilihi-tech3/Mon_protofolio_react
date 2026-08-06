


## 🎯 Contexte & Objectif

**MonPortfolio** est une application web moderne développée en **React JS** permettant à chaque étudiant de créer un compte, de se connecter et de gérer dynamiquement son portfolio professionnel et académique (compétences, projets, formations et présentation personnelle).


## ⚙️ Fonctionnalités principales

- **🔐 Authentification Multi-utilisateurs** : Inscription et connexion sécurisée avec espace administrateur ("Mon portfolio") et session client réactive.
- **⚡ Gestion des Compétences & 🚀 Projets** : Ajout, affichage réactif sous forme de cartes, modification via modale et suppression sécurisée avec confirmation.
- **🔍 Consultation des Détails** : Affichage complet des informations (grande image, technologies, description, lien web externe) au clic sur le libellé.
- **🎓 Parcours Académique & 👤 Bio** : Gestion des diplômes/universités et rédaction d'une présentation personnelle ("À propos de moi").
- **👥 Exploration des Portfolios** : Bascule instantanée entre les portfolios des étudiants de la promotion en mode lecture seule.
- **🔎 Recherche & Filtrage** : Filtrage en temps réel par mot-clé et par catégorie (Compétences / Projets).

---

## 🛠️ Technologies utilisées

- **Frontend** : React JS (v19), Vite (v8), JavaScript ES6+
- **Styling** : Vanilla CSS avec variables globales (`:root`), Flexbox et Grid (Design System sur-mesure)
- **Backend / API REST** : JSON Server sur le port `3001` avec persistance `db.json`
- **Gestion d'état & Session** : React Context API (`AuthContext`) & `sessionStorage`

---

## 📂 Structure du projet

L'application respecte une séparation stricte des responsabilités découpée en **21 composants réutilisables** :

```
mgelo126_Soilihi_Abdou_react/
├── backend/                       ← API REST factice (json-server & db.json)
└── src/
    ├── context/                   ← Context API d'authentification (AuthContext.jsx)
    ├── services/                  ← Module d'appel aux API REST (api.js)
    └── components/                ← 21 Composants React autonomes
        ├── Navbar.jsx / UserSelector.jsx / ProfilCard.jsx
        ├── AboutSection.jsx / FormationsSection.jsx / CompetencesSection.jsx / ProjetsSection.jsx
        ├── ItemGrid.jsx / ItemCard.jsx / ItemDetailsModal.jsx / ItemFormModal.jsx
        ├── AddFormationModal.jsx / EditFormationModal.jsx / ProfilEditModal.jsx / ConfirmDeleteModal.jsx
        ├── SectionTitle.jsx / FilterBar.jsx / StatsBar.jsx / LoginForm.jsx / SignupForm.jsx / Loader.jsx
```

---

## 🚀 Instructions d'installation & Lancement

### 1. Démarrer le serveur backend (API REST)
Dans un premier terminal :
```bash
cd backend
npm install
npm run dev
```
Le serveur API sera accessible sur **http://localhost:3001**.

### 2. Démarrer l'application frontend (React)
Dans un second terminal à la racine du projet :
```bash
npm install
npm run dev
```
L'application web sera accessible sur **http://localhost:5173**.

---

## 🔑 Comptes de démonstration

| Utilisateur | Email | Mot de passe | Rôle |
|---|---|---|---|
| **Abdou Soilihi** | `abdou@portfolio.sn` | `abdou123` | Administrateur de son portfolio |
| **Faruck abdou** | `faruck@gmail.com` | `Passer123` | Administrateur de son portfolio |

---

## 🎓 Conclusion

Le projet **MonPortfolio** met en œuvre l'ensemble des concepts fondamentaux de React JS (composants modulaires, hooks d'état et d'effet, Context API, communication avec une API REST HTTP et design responsive). Il offre une plateforme complète, robuste et évolutive pour la présentation des travaux académiques et professionnels des étudiants.
