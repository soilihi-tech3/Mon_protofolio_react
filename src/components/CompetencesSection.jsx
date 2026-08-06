// ============================================================
// CompetencesSection.jsx — Section Compétences
// ============================================================
// Affiche le titre de la section "⚡ Compétences" et la grille des cartes compétences.

import SectionTitle from "./SectionTitle";
import ItemGrid from "./ItemGrid";

function CompetencesSection({
  competences,
  peutGerer,
  surClicTitre,
  surModifier,
  surSupprimer
}) {
  return (
    <section className="section-portfolio">
      <SectionTitle
        icone="⚡"
        titre="Compétences"
        nombreElements={competences.length}
      />
      <ItemGrid
        elements={competences}
        peutGerer={peutGerer}
        surClicTitre={surClicTitre}
        surModifier={surModifier}
        surSupprimer={surSupprimer}
        messageVide="Aucune compétence enregistrée pour le moment."
      />
    </section>
  );
}

export default CompetencesSection;
