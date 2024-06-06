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
      <FormTexte handlerV={handlerAnime}></FormTexte>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AffichAnime a={anime}></AffichAnime>
      </div>
    </div>
  );
}

export default Home;
