// ============================================================
// EditFormationModal.jsx — Modal de modification d'une formation
// ============================================================

import { useState } from "react";

function EditFormationModal({ formation, surModifier, surFermer }) {
  const [diplome, setDiplome] = useState(formation.diplome || "");
  const [etablissement, setEtablissement] = useState(formation.etablissement || "");
  const [annee, setAnnee] = useState(formation.annee || "");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(e) {
    e.preventDefault();
    if (!diplome || !etablissement || !annee) return;

    setEnvoiEnCours(true);
    await surModifier({
      id: formation.id,
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

        <h2>Modifier la formation</h2>
        <p className="page-auth__intro">
          Modifie les informations de cette formation.
        </p>

        <label htmlFor="diplome">Diplôme / Intitulé *</label>
        <input
          id="diplome"
          value={diplome}
          onChange={(e) => setDiplome(e.target.value)}
          required
        />

        <label htmlFor="etablissement">Université / École *</label>
        <input
          id="etablissement"
          value={etablissement}
          onChange={(e) => setEtablissement(e.target.value)}
          required
        />

        <label htmlFor="annee">Année / Période *</label>
        <input
          id="annee"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bouton bouton--principal bouton--large"
          disabled={envoiEnCours}
        >
          {envoiEnCours ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}

export default EditFormationModal;
