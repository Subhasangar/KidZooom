
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ABC from "./pages/ABC";
import Numbers from "./pages/Numbers";
import Videos from "./pages/Videos";
import Stories from "./pages/Stories";
import StoryReader from "./pages/StoryReader";
import Games from "./pages/Games";
import Gamesquiz from "./pages/Gamesquiz";
import Gamesdiff from "./pages/Gamesdiff/";
import Gamesmemory from "./pages/Gamesmemory/";
import About from "./pages/About/";

import ShashaGuide from "./components/ShashaGuide";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/abc" element={<ABC />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/about" element={<About />}/>
        <Route path="/stories" element={<Stories />} />
        <Route path="/Stories/:id" element={<StoryReader/>} />
       <Route path="/games" element={<Games />} />
         <Route path="/games/quiz" element={<Gamesquiz />} />
         <Route path="/games/diff" element={<Gamesdiff />} />
          <Route path="/games/memory" element={<Gamesmemory />} />
      </Routes>

      <ShashaGuide />
    </BrowserRouter>
  );
}
