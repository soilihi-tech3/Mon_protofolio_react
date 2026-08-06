
function ItemDetailsModal({ element, nomProprietaire, surFermer }) {
  return (
    // Cliquer en dehors de la carte (sur le fond sombre) ferme aussi la fenêtre.
    <div className="fond-modale" onClick={surFermer}>
      <div className="carte-modale" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="carte-modale__fermer" onClick={surFermer} aria-label="Fermer">
          ✕
        </button>

        <span className={`etiquette-type etiquette-type--${element.type}`}>
          {element.type === "competence" ? "Compétence" : "Projet"}
        </span>

        <img
          src={element.image || "/image-par-defaut.svg"}
          alt={element.titre}
          className="carte-modale__image"
        />

        <h2>{element.titre}</h2>
        {nomProprietaire && <p className="carte-modale__proprietaire">Portfolio de {nomProprietaire}</p>}

        {element.type === "projet" && (
          <>
            {element.technologies && <p className="carte-modale__niveau">Technologies : {element.technologies}</p>}
            {element.lien && (
              <a href={element.lien} target="_blank" rel="noreferrer" className="lien">
                Voir le projet ↗
              </a>
            )}
          </>
        )}

        <p className="carte-modale__description">{element.description}</p>
      </div>
    </div>
  );
}

export default ItemDetailsModal;
