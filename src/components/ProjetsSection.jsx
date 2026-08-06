// ============================================================
// ProjetsSection.jsx — Section Projets
// ============================================================

import SectionTitle from "./SectionTitle";
import ItemGrid from "./ItemGrid";

function ProjetsSection({
  projets,
  peutGerer,
  surClicTitre,
  surModifier,
  surSupprimer
}) {
  return (
    <section className="section-portfolio">
      <SectionTitle
        icone=""
        titre="Projets"
        nombreElements={projets.length}
      />
      <ItemGrid
        elements={projets}
        peutGerer={peutGerer}
        surClicTitre={surClicTitre}
        surModifier={surModifier}
        surSupprimer={surSupprimer}
        messageVide="Aucun projet enregistré pour le moment."
      />
    </section>
  );
}

export default ProjetsSection;
