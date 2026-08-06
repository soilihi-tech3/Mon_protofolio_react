// ============================================================
// ItemGrid.jsx — Grille d'affichage des éléments
// ============================================================


import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";

function ItemGrid({
  elements,
  trouverNomProprietaire,
  peutGerer,
  surClicTitre,
  surModifier,
  surSupprimer,
  messageVide, // message personnalisé affiché si la liste est vide
}) {

  if (elements.length === 0) {
    return (
      <EmptyState
        message={messageVide || "Aucun élément pour l'instant"}
        sousMessage={
          peutGerer
            ? "Clique sur « Ajouter un élément » pour créer ta première compétence ou ton premier projet."
            : null
        }
      />
    );
  }


  return (
    <div className="grille-elements">

      {elements.map((element) => (
        <ItemCard
          key={element.id}
          element={element}
          nomProprietaire={trouverNomProprietaire ? trouverNomProprietaire(element) : null}
          peutGerer={peutGerer}
          surClicTitre={() => surClicTitre(element)}
          surModifier={() => surModifier(element)}
          surSupprimer={() => surSupprimer(element)}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
