import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Config } from "../Config";

const Layout = () => {

  const [img, setImg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [credentials, setCredentials] = useState(null);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkCredentials = () => {
    const skred = { username: localStorage.getItem("anime-hub-username"), password: localStorage.getItem("anime-hub-password") };

    if (localStorage.getItem("anime-hub-username")) {
      setCredentials(skred);
    };
  };

  const connect = async () => {
    const endpoint = Config.apiUri + "/login";

    const skred = { username: username, password: password };

    try {
      const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(skred)
      });

      if (!res.ok) {
          throw new Error('wrong credentials');
      } else {
        localStorage.setItem('anime-hub-username', username);
        localStorage.setItem('anime-hub-password', password);
        setCredentials(skred);
      }

    } catch (error) {
        console.log(error);
    }
  };

  const disconnect = () => {
    localStorage.setItem('anime-hub-username', "");
    localStorage.setItem('anime-hub-password', "");
    setCredentials(null);
  }

  useEffect(() => {
    const fetchImg = async () => {
      const endpoint = "https://api.waifu.pics/sfw/smug";

      const reponse = await fetch(endpoint);
      const img = await reponse.json();

      setImg(img.url);
    };
    fetchImg();

    checkCredentials();
  }, []);

  return (
    <>
      <header className="App-header"
      style={{ marginTop: "3vh"}}>
        <img className="random-image" src={ img }></img>
        <Link
          to="/"
          style={{ textDecoration: "none" , color: "#000", fontSize : "25px", color: "#F77D1A"}}
        >
          <h1>AnimeHub 🍜</h1>
        </Link>
        { !credentials ?
          <div className="login">
            <input type="text" placeholder="Nom d'utilisateur" onChange={ changeUsername }></input>
            <input type="password" placeholder="Mot de passe" onChange={ changePassword }></input>
            <button onClick={ connect }>Connexion</button>
          </div>
          : 
          <div className="user-box">
            <div className="username">{ credentials?.username }</div>
            <button onClick={ disconnect }>Déconnexion</button>
          </div>
        }
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
