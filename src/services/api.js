// Ce fichier regroupe TOUTES les requêtes vers notre faux serveur d'API REST (json-server).


// Adresse de notre backend (json-server). Si tu changes le port dans backend/package.json,
// pense à le changer ici aussi.
const ADRESSE_SERVEUR = "http://localhost:3001";

// Petite fonction "maison" utilisée par toutes les autres.
// Elle envoie la requête, vérifie si ça s'est bien passé, et renvoie le résultat en JSON.
async function envoyerRequete(chemin, options = {}) {
  const reponse = await fetch(`${ADRESSE_SERVEUR}${chemin}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!reponse.ok) {
    throw new Error(
      "Le serveur n'a pas pu traiter la demande. As-tu bien lancé le backend (npm start dans le dossier backend) ?"
    );
  }

  // Une requête DELETE ne renvoie pas toujours du contenu, on gère ce cas simplement.
  const texte = await reponse.text();
  return texte ? JSON.parse(texte) : null;
}

// ---------- UTILISATEURS (comptes) ----------

// Récupère tous les utilisateurs (utile pour afficher le nom du propriétaire d'un portfolio)
export function recupererUtilisateurs() {
  return envoyerRequete("/utilisateurs");
}

// Cherche un utilisateur par son email (utilisé à la connexion et à l'inscription)
export async function trouverUtilisateurParEmail(email) {
  const resultats = await envoyerRequete(
    `/utilisateurs?email=${encodeURIComponent(email)}`
  );
  return resultats[0] || null;
}

// Crée un nouveau compte (inscription)
export function creerUtilisateur(nouvelUtilisateur) {
  return envoyerRequete("/utilisateurs", {
    method: "POST",
    body: JSON.stringify(nouvelUtilisateur),
  });
}

// Met à jour les informations de profil d'un utilisateur (bio, formation, métier)
// On utilise PATCH pour ne modifier QUE les champs envoyés, sans écraser les autres.
export function modifierUtilisateur(id, donneesModifiees) {
  return envoyerRequete(`/utilisateurs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(donneesModifiees),
  });
}

// ---------- ELEMENTS (compétences et projets) ----------

// Récupère TOUS les éléments de TOUS les utilisateurs (mode "Explorer les portfolios")
export function recupererTousLesElements() {
  return envoyerRequete("/elements");
}

// Récupère uniquement les éléments d'un utilisateur précis (mode "Mon portfolio")
export function recupererElementsDe(utilisateurId) {
  return envoyerRequete(`/elements?utilisateurId=${utilisateurId}`);
}

// Ajoute un nouvel élément (compétence ou projet)
export function ajouterElement(element) {
  return envoyerRequete("/elements", {
    method: "POST",
    body: JSON.stringify(element),
  });
}

// Modifie un élément existant
export function modifierElement(id, donneesModifiees) {
  return envoyerRequete(`/elements/${id}`, {
    method: "PUT",
    body: JSON.stringify(donneesModifiees),
  });
}

// Supprime un élément
export function supprimerElement(id) {
  return envoyerRequete(`/elements/${id}`, {
    method: "DELETE",
  });
}
