import React, { useState } from "react";
//search bar components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//search button components
import Button from "@mui/material/Button";

function FormTexte(props) {
  const [texte, setTexte] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (texte !== "") {
      props.handlerV(texte);
      setTexte("");
    }
  };
  const handleChange = (event) => {
    setTexte(event.target.value);
  };
  return (

  <div className="here">
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25vw" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        id="standard-basic"
        label="Choisir un anime"
        variant="standard"
        name="search"
        value={texte}
        onChange={handleChange}
      />
      <Button type="submit" value="Submit" id="search-button" variant="contained">
        Rechercher
      </Button>
    </Box>
  </div>
  );
}

export default FormTexte;
