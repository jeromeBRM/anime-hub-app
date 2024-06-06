import { Link } from "react-router-dom";
import { useState } from "react";
import AffichAnime from "./AffichAnime";
import FormTexte from "./FormTexte";

function Home() {
  const [anime, setAnime] = useState("");
  const handlerAnime = (texte) => {
    setAnime(texte);
  };
  return (
    <div className="App">
      <FormTexte className="form" handlerV={handlerAnime}></FormTexte>
      <AffichAnime a={anime}></AffichAnime>
    </div>
  );
}

export default Home;
