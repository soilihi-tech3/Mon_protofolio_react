// ============================================================
// ProfilCard.jsx — Bandeau Profil
// ============================================================
// Affiche le nom, prénom et métier de l'étudiant sous forme d'en-tête de portfolio.

const COULEURS_AVATAR = [
  "#1f6f5c",
  "#d9a441",
  "#3a6ea8",
  "#9b4dca",
  "#c0392b",
  "#16a085",
];

function ProfilCard({ utilisateur }) {
  if (!utilisateur) return null;

  const initiales = (
    (utilisateur.prenom?.[0] || "?").toUpperCase() +
    (utilisateur.nom?.[0] || "").toUpperCase()
  );
  const couleurIndex = (utilisateur.prenom?.length || 0) % COULEURS_AVATAR.length;
  const couleurAvatar = COULEURS_AVATAR[couleurIndex];

  return (
    <div className="profil-card">
      <div
        className="profil-card__avatar"
        style={{ backgroundColor: couleurAvatar }}
        aria-hidden="true"
      >
        {initiales}
      </div>

      <div className="profil-card__infos">
        <h2 className="profil-card__nom">
          Portfolio de {utilisateur.prenom} {utilisateur.nom}
        </h2>
        {utilisateur.metier && (
          <p className="profil-card__metier"> {utilisateur.metier}</p>
        )}
      </div>
    </div>
  );
}

export default ProfilCard;
