// ============================================================
// ProfilEditModal.jsx — Fenêtre de modification de la bio "À propos de moi"
// ============================================================

import { useState } from "react";

function ProfilEditModal({ bioInitiale, surEnregistrer, surFermer }) {
  const [bio, setBio] = useState(bioInitiale || "");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setEnvoiEnCours(true);
    await surEnregistrer(bio);
    setEnvoiEnCours(false);
  }

  return (
    <div className="fond-modale" onClick={surFermer}>
      <form
        className="carte-modale carte-formulaire"
        onClick={(e) => e.stopPropagation()}
        onSubmit={gererEnvoi}
      >
        <button
          type="button"
          className="carte-modale__fermer"
          onClick={surFermer}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2>À propos de moi</h2>
        <p className="page-auth__intro">
          Rédige une courte présentation qui apparaîtra sur ton portfolio.
        </p>

        <label htmlFor="profil-bio">Saisis ta présentation (Text Area)</label>
        <textarea
          id="profil-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
          placeholder="Présente-toi, tes ambitions, tes centres d'intérêt et ton parcours..."
          required
        />

        <button
          type="submit"
          className="bouton bouton--principal bouton--large"
          disabled={envoiEnCours}
        >
          {envoiEnCours ? "Sauvegarde..." : "Enregistrer ma présentation"}
        </button>
      </form>
    </div>
  );
}

export default ProfilEditModal;
