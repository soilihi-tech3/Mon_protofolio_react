// ============================================================
// SectionTitle.jsx — Grand titre de section décoratif
// ============================================================


function SectionTitle({ titre, icone, nombre, nombreElements, action }) {
  const quantite = nombreElements !== undefined ? nombreElements : nombre;

  return (
    // La div racine sert de ligne horizontale séparatrice
    <div className="section-title">

      {/* Partie gauche : icône + texte du titre */}
      <div className="section-title__gauche">
        {icone && (
          <span className="section-title__icone" aria-hidden="true">
            {icone}
          </span>
        )}
        <h2 className="section-title__texte">{titre}</h2>
      </div>

      {/* Partie droite : action + badge indiquant le nombre d'éléments */}
      <div className="section-title__droite">
        {action}
        {quantite !== undefined && (
          <span className="section-title__badge">
            {quantite} {quantite <= 1 ? "élément" : "éléments"}
          </span>
        )}
      </div>
    </div>
  );
}

export default SectionTitle;
