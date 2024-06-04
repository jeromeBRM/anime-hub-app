import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="App-header">
        <h1>AnimeHub</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
};

export default Layout;