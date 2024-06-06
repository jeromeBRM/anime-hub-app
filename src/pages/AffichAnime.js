import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function AffichAnime(props) {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    if (props.a) {
      fetch(
        `https://api.jikan.moe/v4/anime?type=tv&limit=20&order_by=score&sort=desc&q=${props.a}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((dataJSON) => {
          const animeData = dataJSON.data || []; // Check if dataJSON.data exists
          setAnimes(animeData);
          console.log({ animes: animeData });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setAnimes([]); // Set animes to an empty array in case of error
        });
      console.log(props.a);
    }
  }, [props.a]);

  return (
    <div>
      <Grid className="gridAnime" container >
        {animes.map((i) => {
          console.log(i);
          return (
            <Card style={{ height: "318px", width: "230px", margin: "25px"}}>
              <Link to={"/anime/" + i.mal_id}>
                <CardMedia className="card" style={{ height: "200px" }}>
                  <img
                    style={{ width: "230px", height: "auto", objectFit: "cover" }}
                    src={i.images.jpg.image_url}
                    alt="affiche"
                  ></img>
                </CardMedia>
                <CardContent style={{ border: "2px solid white" }}>
                  <Typography style={{ textDecoration: "none", color:"#fff", fontSize: "15px" }} component="h5">{i.title}</Typography>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}

export default AffichAnime;
