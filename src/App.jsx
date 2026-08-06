// ============================================================
// App.jsx — Chef d'orchestre de l'application
// ============================================================


import { useEffect, useState, useMemo } from "react";
import { useAuth } from "./context/AuthContext";
import {
  recupererUtilisateurs,
  recupererTousLesElements,
  recupererElementsDe,
  ajouterElement,
  modifierElement,
  supprimerElement,
  modifierUtilisateur, // Pour sauvegarder bio + formation du profil
} from "./services/api";

// --- Import des composants d'interface ---
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ItemGrid from "./components/ItemGrid";
import ItemDetailsModal from "./components/ItemDetailsModal";
import ItemFormModal from "./components/ItemFormModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import Loader from "./components/Loader";
import FilterBar from "./components/FilterBar";
import SectionTitle from "./components/SectionTitle";
import StatsBar from "./components/StatsBar";
import ProfilCard from "./components/ProfilCard";
import ProfilEditModal from "./components/ProfilEditModal";
import AboutSection from "./components/AboutSection";
import FormationsSection from "./components/FormationsSection";
import AddFormationModal from "./components/AddFormationModal";
import EditFormationModal from "./components/EditFormationModal";
import CompetencesSection from "./components/CompetencesSection";
import ProjetsSection from "./components/ProjetsSection";
import UserSelector from "./components/UserSelector";

import "./App.css";

function App() {
  // On récupère l'utilisateur connecté et les fonctions du contexte d'authentification.

  const { utilisateurConnecte, chargementSession, deconnecter, mettreAJourSession } = useAuth();

  // --- États des modales Profil & Formation ---
  const [profilModalOuvert, setProfilModalOuvert] = useState(false);
  const [formationModalOuverte, setFormationModalOuverte] = useState(false);
  const [formationEnEdition, setFormationEnEdition] = useState(null);
  const [bioASupprimer, setBioASupprimer] = useState(false);
  const [formationASupprimer, setFormationASupprimer] = useState(null);

  // --- États de navigation ---
  // "page" détermine quel grand écran on affiche.
  // "modeAffichage" détermine, sur l'écran portfolio, ce qu'on voit.
  const [page, setPage] = useState("portfolio");
  const [modeAffichage, setModeAffichage] = useState("explorer");
  const [sectionActive, setSectionActive] = useState("tout");

  // --- État des données ---
  // "elements" contient tous les éléments chargés depuis le serveur.
  // "utilisateurs" contient tous les comptes (pour afficher "par Fatou Diop").
  const [elements, setElements] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [chargementElements, setChargementElements] = useState(true);
  const [erreurChargement, setErreurChargement] = useState("");

  // --- États des fenêtres modales ---

  const [elementConsulte, setElementConsulte] = useState(null); // Modal "Détails"
  const [elementEnEdition, setElementEnEdition] = useState(null); // Modal "Formulaire"
  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [elementASupprimer, setElementASupprimer] = useState(null); // Modal "Confirmation"

  // --- États de la barre de filtrage (nouveaux composants) ---

  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState("tout");
  const [utilisateurFiltre, setUtilisateurFiltre] = useState("");

  // -------------------------------------------------------
  // Chargement des utilisateurs (une seule fois au démarrage)
  // -------------------------------------------------------

  useEffect(() => {
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
  }, []);

  // -------------------------------------------------------
  // Rechargement des éléments

  useEffect(() => {
    if (!utilisateurConnecte && modeAffichage === "monPortfolio") {
      setModeAffichage("explorer");
    }
    chargerElements();
    // Réinitialiser la recherche, le filtre de type ET le filtre utilisateur
    setRecherche("");
    setFiltreType("tout");
    setUtilisateurFiltre("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeAffichage, utilisateurConnecte]);

  // Fonction qui va chercher les éléments sur le serveur.
  async function chargerElements() {
    setChargementElements(true);
    setErreurChargement("");
    try {
      const donnees =
        modeAffichage === "monPortfolio" && utilisateurConnecte
          ? await recupererElementsDe(utilisateurConnecte.id)
          : await recupererTousLesElements();
      setElements(donnees);
    } catch (erreur) {
      setErreurChargement(erreur.message);
    } finally {
      // Qu'il y ait eu une erreur ou non, on arrête d'afficher le loader.
      setChargementElements(false);
    }
  }

  // -------------------------------------------------------
  // Filtrage dynamique des éléments (nouveau : FilterBar)
  // -------------------------------------------------------

  const elementsFiltres = useMemo(() => {
    return elements.filter((el) => {
      // Filtre 1 : par type ("tout" = on garde tout, sinon on compare le type)
      const correspondType = filtreType === "tout" || el.type === filtreType;

      // Filtre 2 : par texte (on cherche dans le titre ET la description, sans casse)
      const texteMinuscule = recherche.toLowerCase();
      const correspondRecherche =
        texteMinuscule === "" ||
        el.titre.toLowerCase().includes(texteMinuscule) ||
        (el.description && el.description.toLowerCase().includes(texteMinuscule));

      // Filtre 3 : par utilisateur (uniquement en mode Explorer)
      // "" = pas de filtre, on garde tout ; sinon on ne garde que les éléments de cet utilisateur
      const correspondUtilisateur =
        utilisateurFiltre === "" || el.utilisateurId === utilisateurFiltre;

      // L'élément est gardé seulement s'il passe les TROIS filtres
      return correspondType && correspondRecherche && correspondUtilisateur;
    });
  }, [elements, filtreType, recherche, utilisateurFiltre]);

  // -------------------------------------------------------
  // Utilisateur à afficher dans ProfilCard
  // -------------------------------------------------------

  const utilisateurAffiche = useMemo(() => {
    if (modeAffichage === "monPortfolio") return utilisateurConnecte;
    if (modeAffichage === "explorer") {
      if (utilisateurFiltre) {
        return utilisateurs.find((u) => u.id === utilisateurFiltre) || null;
      }
      // En mode Explorer sans filtre, on affiche par défaut le 1er étudiant s'il y en a
      return utilisateurs.length > 0 ? utilisateurs[0] : null;
    }
    return null;
  }, [modeAffichage, utilisateurConnecte, utilisateurFiltre, utilisateurs]);
  // On compte depuis "elements" (pas "elementsFiltres") pour toujours
  // afficher le total réel du portfolio, pas juste le sous-ensemble filtré.
  const nombreCompetences = elements.filter((e) => e.type === "competence").length;
  const nombreProjets = elements.filter((e) => e.type === "projet").length;

  // -------------------------------------------------------
  // Séparation compétences / projets (pour SectionTitle)
  // -------------------------------------------------------

  const competencesFiltrees = elementsFiltres.filter((e) => e.type === "competence");
  const projetsFiltres = elementsFiltres.filter((e) => e.type === "projet");

  // -------------------------------------------------------
  // Fonctions utilitaires
  // -------------------------------------------------------

  // Retrouve le nom complet du propriétaire d'un élément (mode Explorer).
  function trouverNomProprietaire(element) {
    const proprietaire = utilisateurs.find((u) => u.id === element.utilisateurId);
    return proprietaire ? `${proprietaire.prenom} ${proprietaire.nom}` : "";
  }

  // Détermine si l'utilisateur connecté a le droit de gérer les éléments affichés.
  // RÈGLE : on ne peut gérer QUE son propre portfolio (mode "monPortfolio").
  const peutGerer = modeAffichage === "monPortfolio" && Boolean(utilisateurConnecte);

  function allerA(nomDePage) { setPage(nomDePage); }
  function changerMode(nouveauMode) { setModeAffichage(nouveauMode); }

  // Quand on se connecte ou s'inscrit avec succès, on va directement sur son portfolio.
  function apresConnexionOuInscription() {
    setPage("portfolio");
    setModeAffichage("monPortfolio");
  }

  function seDeconnecter() {
    deconnecter();
    setModeAffichage("explorer"); // on retombe en lecture seule
  }

  // -------------------------------------------------------
  // Actions sur les éléments
  // -------------------------------------------------------

  // Appelée quand l'utilisateur valide le formulaire d'ajout ou de modification.
  async function enregistrerElement(donneesFormulaire) {
    if (elementEnEdition) {
      // MODE MODIFICATION : on envoie une requête PUT avec les nouvelles données.
      const elementMisAJour = await modifierElement(elementEnEdition.id, {
        ...elementEnEdition,    // on garde les champs non modifiés (ex: utilisateurId)
        ...donneesFormulaire,   // on écrase avec les nouvelles valeurs saisies
      });
      // On met à jour la liste locale sans recharger tout depuis le serveur.
      setElements((liste) =>
        liste.map((e) => (e.id === elementMisAJour.id ? elementMisAJour : e))
      );
    } else {
      // MODE AJOUT : on envoie une requête POST pour créer un nouvel élément.
      const nouvelElement = await ajouterElement({
        ...donneesFormulaire,
        utilisateurId: utilisateurConnecte.id, // on lie l'élément à l'utilisateur connecté
      });
      // On ajoute le nouvel élément à la fin de la liste locale.
      setElements((liste) => [...liste, nouvelElement]);
    }

    // Dans tous les cas, on ferme le formulaire.
    setFormulaireOuvert(false);
    setElementEnEdition(null);
  }

  // Appelée quand l'utilisateur confirme la suppression dans la modale de confirmation.
  async function confirmerSuppression() {
    await supprimerElement(elementASupprimer.id); // requête DELETE au serveur
    // On retire l'élément de la liste locale (plus besoin de recharger depuis le serveur).
    setElements((liste) => liste.filter((e) => e.id !== elementASupprimer.id));
    setElementASupprimer(null);
  }

  // Sauvegarde la présentation bio (À propos de moi)
  async function sauvegarderBio(nouvelleBio) {
    const utilisateurMisAJour = await modifierUtilisateur(
      utilisateurConnecte.id,
      { bio: nouvelleBio }
    );
    mettreAJourSession(utilisateurMisAJour);
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
    setProfilModalOuvert(false);
  }

  // Supprime la présentation bio après confirmation
  async function confirmerSuppressionBio() {
    const utilisateurMisAJour = await modifierUtilisateur(
      utilisateurConnecte.id,
      { bio: "" }
    );
    mettreAJourSession(utilisateurMisAJour);
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
    setBioASupprimer(false);
  }

  // Ajoute une nouvelle formation à la liste des formations de l'utilisateur connecté
  async function ajouterFormation(nouvelleFormation) {
    const formationsActuelles = utilisateurConnecte.formations || [];
    const nouvellesFormations = [...formationsActuelles, nouvelleFormation];

    const utilisateurMisAJour = await modifierUtilisateur(
      utilisateurConnecte.id,
      { formations: nouvellesFormations }
    );
    mettreAJourSession(utilisateurMisAJour);
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
    setFormationModalOuverte(false);
  }

  // Modifie une formation existante
  async function modifierFormation(formationModifiee) {
    const formationsActuelles = utilisateurConnecte.formations || [];
    const nouvellesFormations = formationsActuelles.map((f) =>
      f.id === formationModifiee.id ? formationModifiee : f
    );

    const utilisateurMisAJour = await modifierUtilisateur(
      utilisateurConnecte.id,
      { formations: nouvellesFormations }
    );
    mettreAJourSession(utilisateurMisAJour);
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
    setFormationEnEdition(null);
  }

  // Supprime une formation existante après confirmation
  async function confirmerSuppressionFormation() {
    if (!formationASupprimer) return;
    const formationsActuelles = utilisateurConnecte.formations || [];
    const nouvellesFormations = formationsActuelles.filter((f) => f.id !== formationASupprimer.id);

    const utilisateurMisAJour = await modifierUtilisateur(
      utilisateurConnecte.id,
      { formations: nouvellesFormations }
    );
    mettreAJourSession(utilisateurMisAJour);
    recupererUtilisateurs().then(setUtilisateurs).catch(() => { });
    setFormationASupprimer(null);
  }


  if (chargementSession) {
    return <Loader texte="Préparation de l'application..." />;
  }
  if (page === "connexion") {
    return <LoginForm surConnexionReussie={apresConnexionOuInscription} surAllerA={allerA} />;
  }
  if (page === "inscription") {
    return <SignupForm surInscriptionReussie={apresConnexionOuInscription} surAllerA={allerA} />;
  }

  // -------------------------------------------------------
  // Écran principal : le portfolio
  // -------------------------------------------------------
  return (
    <div className="app">
      {/* --- Barre de navigation (haut de page) --- */}
      <Navbar
        modeAffichage={modeAffichage}
        sectionActive={sectionActive}
        surChangerMode={(nouveauMode) => {
          setModeAffichage(nouveauMode);
          setPage("portfolio");
        }}
        surChangerSection={(nouvelleSection) => {
          setSectionActive(nouvelleSection);
          setPage("portfolio");
        }}
        surAllerA={setPage}
      />

      <main className="contenu">

        {/* --- En-tête de la page (titre + bouton Ajouter) --- */}
        <div className="contenu__entete">
          <div>
            <h1>
              {modeAffichage === "monPortfolio"
                ? `Le portfolio de ${utilisateurConnecte.prenom}`
                : "Les portfolios de la promo"}
            </h1>
            <p className="contenu__sous-titre">
              {modeAffichage === "monPortfolio"
                ? "Ajoute, modifie ou supprime tes compétences et tes projets."
                : "Compétences et projets partagés par les étudiants — en lecture seule."}
            </p>
          </div>

          {/* Le bouton "Ajouter" n'est visible qu'en mode "Mon portfolio" */}
          {peutGerer && (
            <button
              type="button"
              className="bouton bouton--principal"
              onClick={() => {
                setElementEnEdition(null);   // mode ajout (pas modification)
                setFormulaireOuvert(true);
              }}
            >
              + Ajouter un élément
            </button>
          )}
        </div>

        {/* Bandeau de sélection d'étudiant (au tout début de l'Accueil / Explorer) */}
        {modeAffichage === "explorer" && utilisateurs.length > 0 && (
          <UserSelector
            utilisateurs={utilisateurs}
            utilisateurFiltre={utilisateurFiltre}
            surChangementUtilisateur={setUtilisateurFiltre}
          />
        )}

        {/* Bandeau d'en-tête du portfolio de l'étudiant */}
        {utilisateurAffiche && !chargementElements && (
          <ProfilCard utilisateur={utilisateurAffiche} />
        )}

        {/* Section 1 : À propos de moi */}
        {utilisateurAffiche && !chargementElements && (sectionActive === "tout" || sectionActive === "apropos") && (
          <AboutSection
            bio={utilisateurAffiche.bio}
            peutModifier={modeAffichage === "monPortfolio" && Boolean(utilisateurConnecte)}
            surModifier={() => setProfilModalOuvert(true)}
            surSupprimer={() => setBioASupprimer(true)}
          />
        )}

        {/* Section 2 : Formations */}
        {utilisateurAffiche && !chargementElements && (sectionActive === "tout" || sectionActive === "formations") && (
          <FormationsSection
            formations={utilisateurAffiche.formations || []}
            peutModifier={modeAffichage === "monPortfolio" && Boolean(utilisateurConnecte)}
            surAjouter={() => setFormationModalOuverte(true)}
            surModifier={(f) => setFormationEnEdition(f)}
            surSupprimer={(f) => setFormationASupprimer(f)}
          />
        )}

        {/* ===================================================
            NOUVEAU COMPOSANT 3 : StatsBar
        ==================================================== */}
        {!chargementElements && !erreurChargement && sectionActive === "tout" && (
          <StatsBar
            totalElements={elements.length}
            nombreCompetences={nombreCompetences}
            nombreProjets={nombreProjets}
          />
        )}

        {/* ===================================================
            NOUVEAU COMPOSANT 1 : FilterBar
        ==================================================== */}
        {!chargementElements && !erreurChargement && elements.length > 0 && sectionActive === "tout" && (
          <FilterBar
            recherche={recherche}
            filtreType={filtreType}
            surChangementRecherche={setRecherche}
            surChangementFiltre={setFiltreType}
          />
        )}

        {/* --- Indicateurs d'état (chargement / erreur) --- */}
        {chargementElements && <Loader texte="Chargement des éléments..." />}
        {erreurChargement && <p className="message-erreur">{erreurChargement}</p>}

        {/* ===================================================
            Affichage des éléments EN DEUX SECTIONS SÉPARÉES
        ==================================================== */}
        {!chargementElements && !erreurChargement && (

          <div className="sections-portfolio">

            {/* -----------------------------------------------
                SECTION 3 : COMPÉTENCES (Composant dédié)
            ----------------------------------------------- */}
            {(sectionActive === "tout" || sectionActive === "competences") && (filtreType === "tout" || filtreType === "competence") && (
              <CompetencesSection
                competences={competencesFiltrees}
                peutGerer={peutGerer}
                surClicTitre={setElementConsulte}
                surModifier={(element) => {
                  setElementEnEdition(element);
                  setFormulaireOuvert(true);
                }}
                surSupprimer={setElementASupprimer}
              />
            )}

            {/* -----------------------------------------------
                SECTION 4 : PROJETS (Composant dédié)
            ----------------------------------------------- */}
            {(sectionActive === "tout" || sectionActive === "projets") && (filtreType === "tout" || filtreType === "projet") && (
              <ProjetsSection
                projets={projetsFiltres}
                peutGerer={peutGerer}
                surClicTitre={setElementConsulte}
                surModifier={(element) => {
                  setElementEnEdition(element);
                  setFormulaireOuvert(true);
                }}
                surSupprimer={setElementASupprimer}
              />
            )}
          </div>
        )}
      </main>

      {/* -------------------------------------------------------
          Fenêtres modales (elles s'affichent PAR-DESSUS la page)
      ------------------------------------------------------- */}

      {elementConsulte && (
        <ItemDetailsModal
          element={elementConsulte}
          nomProprietaire={
            modeAffichage === "explorer" ? trouverNomProprietaire(elementConsulte) : null
          }
          surFermer={() => setElementConsulte(null)}
        />
      )}


      {formulaireOuvert && (
        <ItemFormModal
          elementAModifier={elementEnEdition}
          surEnregistrer={enregistrerElement}
          surFermer={() => {
            setFormulaireOuvert(false);
            setElementEnEdition(null);
          }}
        />
      )}

      {/* Modal confirmation suppression d'élément */}
      {elementASupprimer && (
        <ConfirmDeleteModal
          element={elementASupprimer}
          surConfirmer={confirmerSuppression}
          surAnnuler={() => setElementASupprimer(null)}
        />
      )}

      {/* Modal confirmation suppression bio */}
      {bioASupprimer && (
        <ConfirmDeleteModal
          element={{ titre: "votre présentation À propos de moi" }}
          surConfirmer={confirmerSuppressionBio}
          surAnnuler={() => setBioASupprimer(false)}
        />
      )}

      {/* Modal confirmation suppression formation */}
      {formationASupprimer && (
        <ConfirmDeleteModal
          element={{ titre: `la formation « ${formationASupprimer.diplome} »` }}
          surConfirmer={confirmerSuppressionFormation}
          surAnnuler={() => setFormationASupprimer(null)}
        />
      )}

      {/* Modal d'édition de la presentation "À propos de moi" */}
      {profilModalOuvert && (
        <ProfilEditModal
          bioInitiale={utilisateurConnecte?.bio}
          surEnregistrer={sauvegarderBio}
          surFermer={() => setProfilModalOuvert(false)}
        />
      )}

      {/* Modal d'ajout d'une formation */}
      {formationModalOuverte && (
        <AddFormationModal
          surAjouter={ajouterFormation}
          surFermer={() => setFormationModalOuverte(false)}
        />
      )}

      {/* Modal de modification d'une formation */}
      {formationEnEdition && (
        <EditFormationModal
          formation={formationEnEdition}
          surModifier={modifierFormation}
          surFermer={() => setFormationEnEdition(null)}
        />
      )}
    </div>
  );
}

export default App;
