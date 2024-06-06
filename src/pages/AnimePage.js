import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const AnimePage = () => {
  const { animeId } = useParams();

  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const endpoint = "https://api.jikan.moe/v4/anime/" + animeId + "/full";

      const reponse = await fetch(endpoint);
      const anime = await reponse.json();

      setAnime(anime.data);
    };
    fetchAnime();
  }, [animeId]);

  return (
    // <div>
    //     <h1>{anime?.title}</h1>
    //     <div>Popularité : {anime?.popularity}</div>
    //     <div>Rang : {anime?.rank}</div>
    //     <img src={anime?.images.jpg.image_url} alt={anime?.title}/>
    //     <p>Synopsis : {anime?.synopsis}</p>
    //     <div>RECETTES :</div>
    // </div>

    <div className="animeDetail">
      <Link to={anime?.trailer.url}>
        <img src={anime?.images.jpg.large_image_url} alt={anime?.title} />
      </Link>
      <div className="info">
        <p className="title">{anime?.title}</p>
        <p className="synopsis">Synopsis : {anime?.synopsis}</p>
        <div className="price">
          <span> {anime?.popularity}ème of all time</span>
        </div>
      </div>
      <div className="recette">
        <span> Recettes : </span>
      </div>
    </div>
  );
};

export default AnimePage;
