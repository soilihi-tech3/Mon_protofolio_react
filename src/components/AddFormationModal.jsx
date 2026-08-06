// ============================================================
// AddFormationModal.jsx — Modal d'ajout d'une formation
// ============================================================


import { useState } from "react";

function AddFormationModal({ surAjouter, surFermer }) {
  const [diplome, setDiplome] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [annee, setAnnee] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(e) {
    e.preventDefault();
    if (!diplome || !etablissement || !annee) return;

    setEnvoiEnCours(true);
    await surAjouter({
      id: "f_" + Date.now(),
      diplome,
      etablissement,
      annee,
    });
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

        <h2>🎓 Ajouter une formation</h2>
        <p className="page-auth__intro">
          Renseigne ton parcours académique (diplôme, établissement, année).
        </p>

        <label htmlFor="diplome">Diplôme / Intitulé *</label>
        <input
          id="diplome"
          value={diplome}
          onChange={(e) => setDiplome(e.target.value)}
          placeholder="Ex : Licence en Génie Logiciel"
          required
        />

        <label htmlFor="etablissement">Université / École *</label>
        <input
          id="etablissement"
          value={etablissement}
          onChange={(e) => setEtablissement(e.target.value)}
          placeholder="Ex : Université Cheikh Anta Diop (UCAD) / UNCHK"
          required
        />

        <label htmlFor="annee">Année / Période *</label>
        <input
          id="annee"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          placeholder="Ex : 2024 - 2026 ou 2025"
          required
        />

        <button
          type="submit"
          className="bouton bouton--principal bouton--large"
          disabled={envoiEnCours}
        >
          {envoiEnCours ? "Ajout..." : "Ajouter la formation"}
        </button>
      </form>
    </div>
  );
}

export default AddFormationModal;
