import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="App-header"
      style={{ marginTop: "3vh"}}>
        <Link
          to="/"
          style={{ textDecoration: "none" , color: "#000", fontSize : "25px", color: "#F77D1A"}}
        >
          <h1>AnimeHub 🍜</h1>
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
