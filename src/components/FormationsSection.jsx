// ============================================================
// FormationsSection.jsx — Section "Formations"
// ============================================================

import SectionTitle from "./SectionTitle";

function FormationsSection({
  formations = [],
  peutModifier,
  surAjouter,
  surModifier,
  surSupprimer,
}) {
  return (
    <section className="section-portfolio">
      <SectionTitle
        icone="🎓"
        titre="Formations"
        nombreElements={formations.length}
      />

      <div className="formations-list">
        {formations.length === 0 ? (
          <div className="carte-vide">
            <p className="carte-vide__message">
              {peutModifier
                ? "Vous n'avez pas encore ajouté de formation. Cliquez ci-dessous pour ajouter votre parcours académique."
                : "Aucune formation renseignée pour le moment."}
            </p>
          </div>
        ) : (
          <div className="formations-grid">
            {formations.map((f) => (
              <div key={f.id} className="formation-card">
                <div className="formation-card__entete">
                  <div className="formation-card__icon">🎓</div>
                  <div className="formation-card__content">
                    <h3 className="formation-card__diplome">{f.diplome}</h3>
                    <p className="formation-card__etablissement">{f.etablissement}</p>
                    <span className="formation-card__annee">{f.annee}</span>
                  </div>
                </div>

                {peutModifier && (
                  <div className="formation-card__actions">
                    <button
                      type="button"
                      className="bouton bouton--discret bouton--court"
                      onClick={() => surModifier(f)}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="bouton bouton--danger bouton--court"
                      onClick={() => surSupprimer(f)}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {peutModifier && (
          <div className="formations-actions">
            <button
              type="button"
              className="bouton bouton--principal"
              onClick={surAjouter}
            >
              + Ajouter une formation
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FormationsSection;
