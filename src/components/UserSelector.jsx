// ============================================================
// UserSelector.jsx — Sélecteur d'étudiant élégant au sommet de la page
// ============================================================

function UserSelector({ utilisateurs = [], utilisateurFiltre, surChangementUtilisateur }) {
  if (!utilisateurs || utilisateurs.length === 0) return null;

  return (
    <div className="user-selector-banner">
      <span className="user-selector-banner__icon">👤</span>
      <span className="user-selector-banner__label">Portfolio de :</span>
      <select
        className="user-selector-banner__select"
        value={utilisateurFiltre}
        onChange={(e) => surChangementUtilisateur(e.target.value)}
        aria-label="Sélectionner l'étudiant"
      >
        <option value="">Tous les étudiants</option>
        {utilisateurs.map((u) => (
          <option key={u.id} value={u.id}>
            {u.prenom} {u.nom}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelector;
