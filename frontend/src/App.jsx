import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ABC from "./pages/ABC";
import Numbers from "./pages/Numbers";
import Videos from "./pages/Videos";
import Stories from "./pages/Stories";
import StoryReader from "./pages/StoryReader";
import Games from "./pages/Games";
import Gamesquiz from "./pages/Gamesquiz";
import Gamesdiff from "./pages/Gamesdiff";
import Gamesmemory from "./pages/Gamesmemory";
import About from "./pages/About";
import ShashaGuide from "./components/ShashaGuide";

console.log("App.jsx loaded");

export default function App() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/abc" element={<ABC />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/about" element={<About />} />

        {/* Stories */}
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryReader />} />

        {/* Games */}
        <Route path="/games" element={<Games />} />
        <Route path="/games/quiz" element={<Gamesquiz />} />
        <Route path="/games/diff" element={<Gamesdiff />} />
        <Route path="/games/memory" element={<Gamesmemory />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
        />
      </Routes>

      <ShashaGuide />
    </>
  );
}



