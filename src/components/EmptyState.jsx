
function EmptyState({ message, sousMessage }) {
  return (
    <div className="empty-state">
      <p className="empty-state__titre">{message}</p>
      {sousMessage && <p className="empty-state__sous-titre">{sousMessage}</p>}
    </div>
  );
}

export default EmptyState;
