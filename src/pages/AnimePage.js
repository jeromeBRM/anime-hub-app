import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AnimePage = () => {
    const { animeId } = useParams();

    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            const endpoint = 'https://api.jikan.moe/v4/anime/' + animeId + '/full';
        
            const reponse = await fetch(endpoint);
            const anime = await reponse.json();

            setAnime(anime.data);
            };
        fetchAnime();
    }, [animeId]);

    return (
        <div>
            <h1>{anime?.title}</h1>
            <div>Popularité : {anime?.popularity}</div>
            <div>Rang : {anime?.rank}</div>
            <img src={anime?.images.jpg.image_url} alt={anime?.title}/>
            <p>Synopsis : {anime?.synopsis}</p>
            <div>RECETTES :</div>
        </div>
    );
};
  
export default AnimePage;