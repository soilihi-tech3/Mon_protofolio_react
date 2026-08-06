// ============================================================
// Navbar.jsx — Barre de navigation principale
// ============================================================

import { useAuth } from "../context/AuthContext";

function Navbar({
  modeAffichage,
  sectionActive,
  surChangerMode,
  surChangerSection,
  surAllerA,
}) {
  const { utilisateurConnecte, deconnecter } = useAuth();

  const sectionsNav = [
    { id: "tout", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "formations", label: "Formations" },
    { id: "competences", label: "Compétences" },
    { id: "projets", label: "Projets" },
  ];

  function gererDeconnexion() {
    deconnecter();
    surChangerMode("explorer");
  }

  return (
    <header className="navbar">
      <div className="navbar__marque" onClick={() => { surChangerMode("explorer"); surChangerSection("tout"); }} style={{ cursor: "pointer" }}>
        <span className="navbar__logo">🖼️</span>
        <span className="navbar__titre">MonPortfolio</span>
      </div>

      {/* Onglets de navigation par section */}
      <nav className="navbar__onglets">
        {sectionsNav.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className={sectionActive === sec.id ? "onglet onglet--actif" : "onglet"}
            onClick={() => surChangerSection(sec.id)}
          >
            {sec.label}
          </button>
        ))}

        {utilisateurConnecte && (
          <button
            type="button"
            className={modeAffichage === "monPortfolio" ? "onglet onglet--actif" : "onglet"}
            onClick={() => surChangerMode("monPortfolio")}
          >
            Mon portfolio
          </button>
        )}
      </nav>

      {/* Actions de compte (Connexion / Déconnexion) */}
      <div className="navbar__actions">
        {utilisateurConnecte ? (
          <div className="navbar__utilisateur">
            <span className="navbar__salutation">
              Bonjour, <strong>{utilisateurConnecte.prenom}</strong>
            </span>
            <button
              type="button"
              className="bouton bouton--discret"
              onClick={gererDeconnexion}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="navbar__boutons-auth">
            <button
              type="button"
              className="bouton bouton--secondaire"
              onClick={() => surAllerA("connexion")}
            >
              Se connecter
            </button>
            <button
              type="button"
              className="bouton bouton--principal"
              onClick={() => surAllerA("inscription")}
            >
              Créer un compte
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
