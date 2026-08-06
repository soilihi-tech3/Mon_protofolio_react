

function StatsBar({ totalElements, nombreCompetences, nombreProjets }) {
  // Si aucun élément n'est encore chargé, on n'affiche rien
  // pour éviter d'afficher "0 compétences, 0 projets" pendant le chargement.
  if (totalElements === 0) return null;

  return (
    <div className="stats-bar" role="status" aria-live="polite">
      {/* Chaque "tuile" de statistique est composée d'un grand nombre + une étiquette */}

      <div className="stats-bar__tuile">
        {/* Le nombre mis en avant visuellement */}
        <span className="stats-bar__nombre">{totalElements}</span>
        {/* L'étiquette descriptive en dessous */}
        <span className="stats-bar__label">
          {totalElements <= 1 ? "Élément" : "Éléments"}
        </span>
      </div>

      {/* Séparateur visuel entre les tuiles */}
      <div className="stats-bar__separateur" aria-hidden="true" />

      <div className="stats-bar__tuile stats-bar__tuile--competence">
        <span className="stats-bar__nombre">{nombreCompetences}</span>
        <span className="stats-bar__label">
          {nombreCompetences <= 1 ? "Compétence" : "Compétences"}
        </span>
      </div>

      <div className="stats-bar__separateur" aria-hidden="true" />

      <div className="stats-bar__tuile stats-bar__tuile--projet">
        <span className="stats-bar__nombre">{nombreProjets}</span>
        <span className="stats-bar__label">
          {nombreProjets <= 1 ? "Projet" : "Projets"}
        </span>
      </div>
    </div>
  );
}

export default StatsBar;
