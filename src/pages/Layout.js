import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Config } from "../Config";

const Layout = () => {

  const [img, setImg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [credentials, setCredentials] = useState(null);

  const [activeApi, setActive] = useState(false);

  const [tries, setTries] = useState(0);

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

  const checkActive = async () => {
    const endpoint = Config.apiUri + "/recipes/anime?animeid=28171";

    fetch(endpoint)
    .then(res => {
      if (res.ok) {
        setActive(true);
        return res.json();
      } else {
        throw new Error('AnimeHub : Network response was not ok');
      }
    })
    .then(fetchedRecipes => {
    })
    .catch(error => {
    });
  };

  useEffect(() => {
    const fetchImg = async () => {
      const endpoint = "https://api.waifu.pics/sfw/smug";

      const reponse = await fetch(endpoint);
      const img = await reponse.json();

      setImg(img.url);
    };
    fetchImg();

    checkCredentials();

    checkActive();

    const increment = () => {
      const newt = tries;
      setTries(newt => newt + 1);
      checkActive();
   }

    setInterval(increment, 10000);

  }, []);

  return (
    <>
      <header className="App-header"
      >
        <Link
          to="/"
          style={{ textDecoration: "none" , color: "#000", fontSize : "4em", color: "#F77D1A"}}
        >
          <h1 className="titlel">AnimeHub 🍜</h1>
        </Link>
        <img className="random-image" src={ img }></img>
        { !credentials ?
          <div className="login">
            <input className="user-inp" type="text" placeholder="Nom d'utilisateur" onChange={ changeUsername }></input>
            <input className="user-inp" type="password" placeholder="Mot de passe" onChange={ changePassword }></input>
            <button onClick={ connect }>Connexion</button>
          </div>
          : 
          <div className="user-box">
            <div className="username">{ credentials?.username }</div>
            <button onClick={ disconnect }>Déconnexion</button>
          </div>
        }
      </header>
      <div className={ !activeApi ? "loading active" : "loading inactive" }>
        { tries < 3 ?
        <>
          <div>Connexion à l'API</div>
          <svg className="loads" version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
            <circle fill="grey" stroke="none" cx="6" cy="50" r="6">
              <animateTransform 
                attributeName="transform" 
                dur="1s" 
                type="translate" 
                values="0 15 ; 0 -15; 0 15" 
                repeatCount="indefinite" 
                begin="0.1"/>
            </circle>
            <circle fill="grey" stroke="none" cx="30" cy="50" r="6">
              <animateTransform 
                attributeName="transform" 
                dur="1s" 
                type="translate" 
                values="0 10 ; 0 -10; 0 10" 
                repeatCount="indefinite" 
                begin="0.2"/>
            </circle>
            <circle fill="grey" stroke="none" cx="54" cy="50" r="6">
              <animateTransform 
                attributeName="transform" 
                dur="1s" 
                type="translate" 
                values="0 5 ; 0 -5; 0 5" 
                repeatCount="indefinite" 
                begin="0.3"/>
            </circle>
          </svg>
          <div>Essai { tries + 1 } sur 3</div>
        </>
        :
        <>
          <div>AnimeHub n'est pas disponible pour le moment :(</div>
        </>
        }
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
