import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Config } from "../Config";

import RecipeCard from "./RecipeCard";

const AnimePage = () => {
  const { animeId } = useParams();

  const [anime, setAnime] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const endpoint = "https://api.jikan.moe/v4/anime/" + animeId + "/full";

      const reponse = await fetch(endpoint);
      const anime = await reponse.json();

      setAnime(anime.data);
    };
    const fetchRecipes = async () => {
      const endpoint = Config.apiUri + "/recipes/anime?animeid=" + animeId;
      
      fetch(endpoint)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(fetchedRecipes => {
        setRecipes(fetchedRecipes);
      })
      .catch(error => {
      });
    };
    fetchRecipes();
    fetchAnime();
  }, [animeId]);

  return (
    <div>
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
      </div>
      <div className="recette">
        <span> <h1>Recettes :</h1></span>
        { recipes?.map((recipe) => {
          return (
            <RecipeCard key={ recipe.id } recipe={ recipe }></RecipeCard>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default AnimePage;