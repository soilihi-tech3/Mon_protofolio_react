
function ItemCard({ element, nomProprietaire, peutGerer, surClicTitre, surModifier, surSupprimer }) {

  function remplacerParImageParDefaut(evenement) {
    evenement.target.src = "/image-par-defaut.svg";
  }

  return (
    <article className="carte-element">
      <span className={`etiquette-type etiquette-type--${element.type}`}>
        {element.type === "competence" ? "Compétence" : "Projet"}
      </span>

      <img
        src={element.image || "/image-par-defaut.svg"}
        onError={remplacerParImageParDefaut}
        alt={element.titre}
        className="carte-element__image"
      />

      {/* Cliquer sur le libellé ouvre la fenêtre avec tous les détails (spec 5) */}
      <button type="button" className="carte-element__titre" onClick={surClicTitre}>
        {element.titre}
      </button>

      {nomProprietaire && (
        <p className="carte-element__proprietaire">par {nomProprietaire}</p>
      )}

      {peutGerer && (
        <div className="carte-element__actions">
          <button type="button" className="bouton bouton--discret" onClick={surModifier}>
            Modifier
          </button>
          <button type="button" className="bouton bouton--danger" onClick={surSupprimer}>
            Supprimer
          </button>
        </div>
      )}
    </article>
  );
}

export default ItemCard;
