import { Link } from "react-router-dom";
import { useState } from "react";
//search bar components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//search button components
import Button from "@mui/material/Button";

//List Grid content
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [detailAnime, setDetail] = useState([]);
  const [query, setQuery] = useState("");

  const fetchAnimes = async (e) => {
    e.preventDefault();
    const endpoint =
      "https://api.jikan.moe/v4/anime?type=tv&limit=20&order_by=score&sort=desc&q=" +
      query;

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
    setQuery(e.target.value);
  };

  const animeList = animes.map((anime) => (
    // <li key={anime.mal_id + anime.rank}>
    //   <Link to={"/anime/" + anime.mal_id}>{anime.title}</Link>
    // </li>
    <Card style={{ width: "180px", margin: "1%" }} key={anime.mal_id}>
      <CardMedia style={{ height: "200px" }}>
        <img
          component="img"
          //    alt={i.title}
          height="200"
          // image={i.images.jpg.image_url}
        ></img>
      </CardMedia>
      <CardContent>
        <Link to={"/anime/" + anime.mal_id}>{anime.title}<Typography component="h5">{anime.title}</Typography></Link>
      </CardContent>
    </Card>
  ));

  return (
    <div className="App">
      <form onSubmit={fetchAnimes}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25vw" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            id="standard-basic"
            label="Choisir un anime"
            variant="standard"
            name="search"
            onChange={handleQueryChange}
          />
        </Box>
        <Button type="submit" id="search-button" variant="contained">
          Rechercher
        </Button>
      </form>

      <div className="anime-list">
        <Grid container spacing={2}>
          {animeList}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
