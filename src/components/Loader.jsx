
function Loader({ texte = "Chargement..." }) {
  return (
    <div className="loader">
      <span className="loader__rond"></span>
      <p>{texte}</p>
    </div>
  );
}

export default Loader;
