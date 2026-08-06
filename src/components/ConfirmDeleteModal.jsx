
function ConfirmDeleteModal({ element, surConfirmer, surAnnuler }) {
  return (
    <div className="fond-modale" onClick={surAnnuler}>
      <div className="carte-modale carte-modale--petite" onClick={(e) => e.stopPropagation()}>
        <h2>Supprimer « {element.titre} » ?</h2>
        <p>Cette action est définitive, l'élément sera retiré du portfolio.</p>

        <div className="carte-modale__actions">
          <button type="button" className="bouton bouton--discret" onClick={surAnnuler}>
            Annuler
          </button>
          <button type="button" className="bouton bouton--danger" onClick={surConfirmer}>
            Oui, supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
