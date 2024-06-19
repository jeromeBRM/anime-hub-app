import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Config } from "../Config";
import SpotifyAPI from "../SpotifyAPI";

import RecipeCard from "./RecipeCard";
import TrackCard from "./TrackCard";

const AnimePage = () => {
  const { animeId } = useParams();

  const [anime, setAnime] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const endpoint = "https://api.jikan.moe/v4/anime/" + animeId + "/full";

      const reponse = await fetch(endpoint);
      const anime = await reponse.json();

      setAnime(anime.data);

      setTracks(await SpotifyAPI.loadTracksByName(anime.data.title));
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
      <div className="recette">
      <span><h1>Recettes</h1></span>
        { recipes?.map((recipe) => {
          return (
            <RecipeCard key={ recipe.id } recipe={ recipe }></RecipeCard>
          );
        })}
      </div>
      <div className="tracks">
      <span><h1>Playlist</h1></span>
        { tracks?.map((track) => {
          return (
            <TrackCard key={ track.id } track={ track }></TrackCard>
          );
        })}
      </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AnimePage;