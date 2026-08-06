// ============================================================
// AboutSection.jsx — Section "À propos de moi"
// ============================================================

import SectionTitle from "./SectionTitle";

function AboutSection({ bio, peutModifier, surModifier, surSupprimer }) {
  return (
    <section className="section-portfolio">
      <SectionTitle
        icone="👤"
        titre="À propos de moi"
        nombreElements={bio ? 1 : 0}
        action={
          peutModifier ? (
            <button
              type="button"
              className="bouton bouton--principal"
              onClick={surModifier}
            >
              {bio ? "Modifier ma bio" : "Ajouter une bio"}
            </button>
          ) : null
        }
      />

      <div className="about-card">
        {bio ? (
          <>
            <p className="about-card__texte">{bio}</p>
            {peutModifier && (
              <div className="about-card__actions">
                <button
                  type="button"
                  className="bouton bouton--discret"
                  onClick={surModifier}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="bouton bouton--danger"
                  onClick={surSupprimer}
                >
                  Supprimer
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="about-card__vide-container">
            <p className="about-card__vide">
              {peutModifier
                ? " Vous n'avez pas encore rédigé votre bio. Cliquez sur le bouton ci-dessous pour vous présenter."
                : "Aucune présentation renseignée pour le moment."}
            </p>
            {peutModifier && (
              <button
                type="button"
                className="bouton bouton--principal"
                onClick={surModifier}
                style={{ marginTop: "0.8rem" }}
              >
                + Ajouter une bio
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection;
