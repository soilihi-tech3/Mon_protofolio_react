// Ce fichier gère "qui est connecté" et le partage avec toute l'application,
// pour ne pas avoir à faire passer l'utilisateur connecté de composant en composant.
//
// - La liste des comptes est stockée côté SERVEUR (dans backend/db.json, via json-server).
// - Le compte actuellement connecté est en plus gardé côté CLIENT, dans le sessionStorage
//   du navigateur, pour que la connexion reste active tant que l'onglet est ouvert (spec 4).

import { createContext, useContext, useEffect, useState } from "react";
import {
  creerUtilisateur,
  trouverUtilisateurParEmail,
} from "../services/api";

const CLE_SESSION = "portfolio_utilisateur_connecte";

// On crée le "contenant" du contexte, vide pour l'instant.
const AuthContext = createContext(null);

// Ce composant enveloppe toute l'application (voir App.jsx) et fournit
// l'utilisateur connecté + les fonctions connexion/inscription/déconnexion.
export function AuthProvider({ children }) {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState(null);
  const [chargementSession, setChargementSession] = useState(true);

  // Au tout premier chargement de la page, on regarde si une session existait déjà
  // (par exemple si l'utilisateur a rafraîchi la page).
  useEffect(() => {
    const sessionSauvegardee = sessionStorage.getItem(CLE_SESSION);
    if (sessionSauvegardee) {
      setUtilisateurConnecte(JSON.parse(sessionSauvegardee));
    }
    setChargementSession(false);
  }, []);

  // Sauvegarde l'utilisateur à la fois en mémoire (state) et dans le sessionStorage.
  function memoriserSession(utilisateur) {
    setUtilisateurConnecte(utilisateur);
    sessionStorage.setItem(CLE_SESSION, JSON.stringify(utilisateur));
  }

  // Tente une connexion avec un email + mot de passe.
  // Renvoie un message d'erreur (texte) si ça échoue, ou null si tout va bien.
  async function connecter(email, motDePasse) {
    const utilisateurTrouve = await trouverUtilisateurParEmail(email);

    if (!utilisateurTrouve) {
      return "Aucun compte ne correspond à cet email.";
    }
    if (utilisateurTrouve.motDePasse !== motDePasse) {
      return "Mot de passe incorrect.";
    }

    memoriserSession(utilisateurTrouve);
    return null; // pas d'erreur
  }

  // Crée un compte puis connecte automatiquement la personne.
  async function inscrire({ prenom, nom, email, motDePasse, metier }) {
    const compteExistant = await trouverUtilisateurParEmail(email);
    if (compteExistant) {
      return "Un compte existe déjà avec cet email.";
    }

    const nouvelUtilisateur = await creerUtilisateur({
      prenom,
      nom,
      email,
      motDePasse,
      metier,
    });

    memoriserSession(nouvelUtilisateur);
    return null; // pas d'erreur
  }

  function deconnecter() {
    setUtilisateurConnecte(null);
    sessionStorage.removeItem(CLE_SESSION);
  }

  // Tout ce qu'on met ici devient accessible depuis n'importe quel composant
  // grâce au Hook "useAuth" défini juste en dessous.
  const valeurPartagee = {
    utilisateurConnecte,
    chargementSession,
    connecter,
    inscrire,
    deconnecter,
    // Permet à App.jsx de mettre à jour les données du profil sans se déconnecter
    mettreAJourSession: memoriserSession,
  };

  return (
    <AuthContext.Provider value={valeurPartagee}>
      {children}
    </AuthContext.Provider>
  );
}

// Petit Hook pratique : plutôt que d'écrire "useContext(AuthContext)" partout,
// on écrit juste "useAuth()" dans les composants qui en ont besoin.
export function useAuth() {
  return useContext(AuthContext);
}
