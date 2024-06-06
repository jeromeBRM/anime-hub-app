import React, { useState } from "react";

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






    
    <form onSubmit={handleSubmit}>
      <label>Film : </label>
      <input type="text" value={texte} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default FormTexte;
