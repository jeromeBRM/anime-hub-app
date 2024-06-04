import { Link } from "react-router-dom";
import { useState } from 'react';

function Home() {

    const [animes, setAnimes] = useState([]);
    const [query, setQuery] = useState("");
  
    const fetchAnimes = async (e) => {
      e.preventDefault();
      const endpoint = 'https://api.jikan.moe/v4/anime?type=tv&limit=20&order_by=score&sort=desc&q=' + query;
  
      const reponse = await fetch(endpoint);
      const animes = await reponse.json();
      
      setAnimes(uniqueById(animes.data));
    };

    //helper function to remove doubles in anime list

    const uniqueById = (array) => {
        const seen = new Set();
        return array.reduce((acc, anime) => {
            if (!seen.has(anime.mal_id)) {
                seen.add(anime.mal_id);
                acc.push(anime);
            }
            return acc;
        }, []);
    };
  
    const handleQueryChange = (e) => {
      setQuery(e.target.value)
    };
  
    const animeList = animes.map((anime) =>
        <li key={anime.mal_id + anime.rank}>
            <Link to={"/anime/" + anime.mal_id}>{anime.title}</Link>
        </li>
    );
  
    return (
        <div className="App">
        <form onSubmit={fetchAnimes}>
            <input type="text" id="search" name="search" placeholder="Rechercher" onChange={handleQueryChange}></input>
            <button id="search-button">Rechercher</button>
        </form>
        <div className="anime-list">
            <ul>
                {animeList}
            </ul>
        </div>
      </div>
    );
}

export default Home;