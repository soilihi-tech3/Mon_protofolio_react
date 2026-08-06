import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignupForm({ surInscriptionReussie, surAllerA }) {
  const { inscrire } = useAuth();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [metier, setMetier] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setErreur("");
    setEnvoiEnCours(true);

    const messageErreur = await inscrire({ prenom, nom, email, motDePasse, metier });

    setEnvoiEnCours(false);

    if (messageErreur) {
      setErreur(messageErreur);
    } else {
      surInscriptionReussie();
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
        <h1>Créer un compte</h1>
        <p className="page-auth__intro">
          Crée ton compte pour avoir ton propre portfolio, que tu es seul(e) à pouvoir modifier.
        </p>

        {/* Ligne prénom + nom côte à côte */}
        <div className="ligne-formulaire">
          <div>
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Abdou"
              required
            />
          </div>
          <div>
            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Soilihi"
              required
            />
          </div>
        </div>

        <label htmlFor="metier">Ton métier / domaine (optionnel)</label>
        <input
          id="metier"
          value={metier}
          onChange={(e) => setMetier(e.target.value)}
          placeholder="Ex : Développeur Web & Mobile"
        />

        <label htmlFor="emailInscription">Email</label>
        <input
          id="emailInscription"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prenom@exemple.sn"
          required
        />

        <label htmlFor="motDePasseInscription">Mot de passe</label>
        <input
          id="motDePasseInscription"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Au moins 4 caractères"
          minLength={4}
          required
        />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit" className="bouton bouton--principal bouton--large" disabled={envoiEnCours}>
          {envoiEnCours ? "Création en cours..." : "Créer mon compte"}
        </button>

        <p className="page-auth__bascule">
          Déjà un compte ?{" "}
          <button type="button" className="lien" onClick={() => surAllerA("connexion")}>
            Se connecter
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
