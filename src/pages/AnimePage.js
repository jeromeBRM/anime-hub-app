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
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const endpoint = "https://api.jikan.moe/v4/anime/" + animeId + "/full";

      const reponse = await fetch(endpoint);
      const anime = await reponse.json();

      setAnime(anime.data);

      fetchMap(anime.data.studios[0].name);

      setTracks(await SpotifyAPI.loadTracksByName(anime.data.title));
    };
    const fetchRecipes = async () => {
      const endpoint = Config.apiUri + "/recipes/anime?animeid=" + animeId;
      
      fetch(endpoint)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('AnimeHub : Network response was not ok');
        }
      })
      .then(fetchedRecipes => {
        setRecipes(fetchedRecipes);
      })
      .catch(error => {
      });
    };
    const fetchMap = async (query) => {
      const endpoint = "https://nominatim.openstreetmap.org/search?q=" + encodeURI(query) + "&format=json&limit=1";

      fetch(endpoint)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('OpenStreetMap : Network response was not ok');
        }
      })
      .then(fetchedStudio => {
        setStudio(fetchedStudio[0]);
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
          <p className="title">{ anime?.title }</p>
          <p className="synopsis">{ anime?.synopsis }</p>
          <div className="price">
            <span> {anime?.popularity}th of all time</span>
          </div>
        </div>
      <div className="recette">
      <span><h1>Recettes</h1></span>
        { recipes?.map((recipe) => {
          return (
            <RecipeCard key={ recipe.id } recipe={ recipe }></RecipeCard>
          );
        })}
        <div className="new-recipe">
          <input className="new-recipe__input" type="text" placeholder="Nom"></input>
          <textarea className="new-recipe__text" rows="5" cols="33" placeholder="Ingrédients"></textarea>
          <textarea className="new-recipe__text" rows="5" cols="33" placeholder="Préparation"></textarea>
          <button>Publier</button>
        </div>
      </div>
      <div className="tracks">
      <span><h1>Playlist</h1></span>
        { tracks?.map((track) => {
          return (
            <TrackCard key={ track.id } track={ track }></TrackCard>
          );
        })}
      </div>
      <span><h1>Studio</h1></span>
      <div className="studio">
        <h3>{ studio?.display_name }</h3>
        <div className="studio-container">
          <div className="middle-marker">
            <svg viewBox="-13 -13 156.00 156.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" strokeWidth="1.5" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0)"> <path d="M62.3649 76.0626C51.1451 86.1072 40.1732 95.8365 29.311 105.687C23.0183 111.394 16.9509 117.348 10.6729 123.069C9.0008 124.632 7.07937 125.903 4.98785 126.828C3.95649 127.261 1.72933 126.828 1.22143 126.035C0.549397 124.982 0.748089 123.114 1.11261 121.74C1.37779 120.738 2.45753 119.908 3.27208 119.104C18.7627 103.852 34.2604 88.6091 49.7649 73.3765C51.5045 71.6681 53.2942 70.0117 55.293 68.1144C48.5175 60.6052 41.7314 53.3593 35.2529 45.844C24.9134 33.8442 14.7813 21.6659 4.56355 9.56215C4.19212 9.12226 3.87261 8.64079 3.49773 8.20091C1.70969 6.08722 0.449103 3.80904 2.48505 1.24507C4.00964 -0.674661 7.65428 -0.387934 10.1921 2.22366C16.5124 8.7258 22.6693 15.3855 28.7745 22.0963C39.9226 34.3429 50.9837 46.6692 62.092 58.9522C62.5675 59.399 63.0731 59.8124 63.6053 60.1895C72.1948 51.9798 80.6892 43.7969 89.2545 35.6841C99.1881 26.2803 109.157 16.9135 119.16 7.58361C122.912 4.07666 125.921 3.44455 128.224 5.49071C130.61 7.61046 130.388 11.1519 126.582 14.9489C116.293 25.2161 105.755 35.2339 95.2268 45.2629C87.2065 52.9054 79.0583 60.4164 70.5224 68.3992C77.4586 75.5733 84.0927 82.724 91.0479 89.5439C97.7284 96.0945 104.782 102.265 111.594 108.681C114.257 111.095 116.751 113.69 119.058 116.449C120.918 118.763 121.193 121.636 118.906 123.919C116.652 126.17 114.043 125.375 111.869 123.67C107.71 120.58 103.724 117.264 99.9275 113.736C88.3069 102.355 76.8913 90.7657 65.4012 79.2517C64.4925 78.3424 63.6243 77.3883 62.3649 76.0626Z" fill="#ff0000"></path> </g> <defs> <clipPath id="clip0"> <rect width="129" height="127" fill="white" transform="translate(0.777344)"></rect> </clipPath> </defs> </g></svg>
          </div>
          <iframe src={ "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d74508.01159511728!2d" + studio?.lon + "!3d" + studio?.lat + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1718806540268!5m2!1sfr!2sfr" } loading="lazy"></iframe>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AnimePage;