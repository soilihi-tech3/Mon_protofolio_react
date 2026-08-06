import { useState } from "react";

// ============================================================
// ItemFormModal.jsx — Formulaire d'ajout ou de modification d'un élément
// ============================================================
// Ce composant est un modal réutilisable pour :


function ItemFormModal({ elementAModifier, surEnregistrer, surFermer }) {
  const estEnModeEdition = Boolean(elementAModifier);

  // État local des champs du formulaire
  const [type, setType] = useState(elementAModifier?.type || "competence");
  const [titre, setTitre] = useState(elementAModifier?.titre || "");
  const [image, setImage] = useState(elementAModifier?.image || "");
  const [description, setDescription] = useState(elementAModifier?.description || "");
  const [technologies, setTechnologies] = useState(elementAModifier?.technologies || "");
  const [lien, setLien] = useState(elementAModifier?.lien || "");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  async function gererEnvoi(evenement) {
    evenement.preventDefault();
    setErreur("");

    if (!titre.trim()) {
      setErreur("Le titre est obligatoire.");
      return;
    }

    setEnvoiEnCours(true);

    const donneesFormulaire = {
      type,
      titre: titre.trim(),
      image: image.trim(),
      description: description.trim(),
    };

    if (type === "projet") {
      donneesFormulaire.technologies = technologies.trim();
      donneesFormulaire.lien = lien.trim();
    }

    if (estEnModeEdition) {
      donneesFormulaire.id = elementAModifier.id;
    }

    const reussite = await surEnregistrer(donneesFormulaire);
    setEnvoiEnCours(false);

    if (reussite) {
      surFermer();
    }
  }

  return (
    <div className="fond-modale" onClick={surFermer}>
      <div className="carte-modale carte-formulaire" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="carte-modale__fermer"
          onClick={surFermer}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2>{estEnModeEdition ? "Modifier l'élément" : " Ajouter un élément"}</h2>

        <form onSubmit={gererEnvoi} className="carte-formulaire__body">
          {/* Choix du type (compétence vs projet) */}
          <div className="champ-groupe">
            <label className="champ-label">Type d'élément</label>
            <div className="choix-type">
              <label className={type === "competence" ? "choix-type__option choix-type__option--actif" : "choix-type__option"}>
                <input
                  type="radio"
                  name="typeElement"
                  value="competence"
                  checked={type === "competence"}
                  onChange={() => setType("competence")}
                />
                Compétence
              </label>
              <label className={type === "projet" ? "choix-type__option choix-type__option--actif" : "choix-type__option"}>
                <input
                  type="radio"
                  name="typeElement"
                  value="projet"
                  checked={type === "projet"}
                  onChange={() => setType("projet")}
                />
                Projet
              </label>
            </div>
          </div>

          {/* Titre / Libellé */}
          <div className="champ-groupe">
            <label htmlFor="titre" className="champ-label">Titre / Libellé *</label>
            <input
              id="titre"
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder={type === "competence" ? "Ex : React JS" : "Ex : Application E-commerce"}
              required
            />
          </div>

          {/* URL de l'image */}
          <div className="champ-groupe">
            <label htmlFor="image" className="champ-label">URL de l'image illustrative</label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Aperçu de l'image si une URL est saisie */}
          {image && (
            <div className="apercu-image">
              <span className="apercu-image__label">Aperçu de l'image :</span>
              <img
                src={image}
                alt="Aperçu"
                className="apercu-image__img"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Champs spécifiques aux projets */}
          {type === "projet" && (
            <>
              <div className="champ-groupe">
                <label htmlFor="technologies" className="champ-label">Technologies utilisées</label>
                <input
                  id="technologies"
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Ex : React JS, Node.js, MongoDB"
                />
              </div>

              <div className="champ-groupe">
                <label htmlFor="lien" className="champ-label">Lien du projet (URL)</label>
                <input
                  id="lien"
                  type="url"
                  value={lien}
                  onChange={(e) => setLien(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </>
          )}

          {/* Description */}
          <div className="champ-groupe">
            <label htmlFor="description" className="champ-label">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explique en quelques phrases les détails et objectifs..."
              rows={3}
            />
          </div>

          {erreur && <p className="message-erreur">{erreur}</p>}

          <button
            type="submit"
            className="bouton bouton--principal bouton--large"
            disabled={envoiEnCours}
          >
            {envoiEnCours
              ? "Enregistrement..."
              : estEnModeEdition
                ? "Mettre à jour"
                : "Ajouter au portfolio"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemFormModal;
