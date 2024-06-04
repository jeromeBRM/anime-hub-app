import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="anime/:animeId" element={<AnimePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;