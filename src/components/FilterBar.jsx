// ============================================================
// FilterBar.jsx — Barre de recherche et filtrage par type
// ============================================================

function FilterBar({
  recherche,
  filtreType,
  surChangementRecherche,
  surChangementFiltre,
}) {
  const filtres = [
    { valeur: "tout", etiquette: "Tout" },
    { valeur: "competence", etiquette: "Compétences" },
    { valeur: "projet", etiquette: "Projets" },
  ];

  return (
    <div className="filter-bar">
      {/* --- Zone de recherche textuelle --- */}
      <div className="filter-bar__recherche">
        <span className="filter-bar__icone-loupe" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="filter-bar__input"
          placeholder="Rechercher un titre ou une description..."
          value={recherche}
          onChange={(e) => surChangementRecherche(e.target.value)}
          aria-label="Rechercher un élément"
        />
      </div>

      {/* --- Boutons de filtrage par type --- */}
      <div className="filter-bar__filtres" role="group" aria-label="Filtrer par type">
        {filtres.map((f) => (
          <button
            key={f.valeur}
            type="button"
            className={filtreType === f.valeur ? "filtre-btn filtre-btn--actif" : "filtre-btn"}
            onClick={() => surChangementFiltre(f.valeur)}
            aria-pressed={filtreType === f.valeur}
          >
            {f.etiquette}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
