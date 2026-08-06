import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// ============================================================
// LoginForm.jsx — Formulaire de connexion
// ============================================================

function LoginForm({ surConnexionReussie, surAllerA }) {
  const { connecter } = useAuth();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setErreur("");
    setEnvoiEnCours(true);

    const messageErreur = await connecter(email, motDePasse);

    setEnvoiEnCours(false);

    if (messageErreur) {
      setErreur(messageErreur);
    } else {
      surConnexionReussie();
    }
  }

  return (
    <div className="page-auth">

      {/* Bouton retour vers l'exploration (en haut à gauche) */}
      <button
        type="button"
        className="page-auth__retour"
        onClick={() => surAllerA("portfolio")}
        aria-label="Retour à l'exploration"
      >
        ← Explorer les portfolios
      </button>

      <form className="carte-formulaire" onSubmit={gererEnvoi}>

        {/* Logo + titre */}
        <div className="carte-formulaire__logo">🖼️</div>
        <h1>Se connecter</h1>
        <p className="page-auth__intro">
          Connecte-toi pour ajouter, modifier ou supprimer les éléments de ton portfolio.
        </p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prenom@exemple.sn"
          required
        />

        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          id="motDePasse"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="••••••••"
          required
        />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit" className="bouton bouton--principal bouton--large" disabled={envoiEnCours}>
          {envoiEnCours ? "Connexion en cours..." : "Se connecter"}
        </button>

        <p className="page-auth__bascule">
          Pas encore de compte ?{" "}
          <button type="button" className="lien" onClick={() => surAllerA("inscription")}>
            Créer un compte
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
