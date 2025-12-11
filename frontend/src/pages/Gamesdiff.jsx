import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import balloonLeft from "/assets/balloon-left.jpg";
import balloonRight from "/assets/balloon-right.jpg";
import camelLeft from "/assets/camel-left.png";
import camelRight from "/assets/camel-right.png";
import snowLeft from "/assets/snow-left.jpg";
import snowRight from "/assets/snow-right.jpg";

const levels = [
  {
    title: "Balloon Girl",
    left: balloonLeft,
    right: balloonRight,
    spots: [
      { top: 33, left: 27 } 
    ],
  },
  {
    title: "Camel Desert",
    left: camelLeft,
    right: camelRight,
    spots: [
      { top: 30, left: 19 },
      { top: 12, left: 8 },
      { top: 50, left: 75 },
      { top: 78, left: 50 },
      { top: 57, left: 18 },
    ],
  },
  {
    title: "Snowman Kids",
    left: snowLeft,
    right: snowRight,
    spots: [
      { top: 50, left: 20 },
      { top: 75, left: 38 },
      { top: 50, left: 62 },
      { top: 72, left: 20 },
    ],
  },
];

export default function GamesDiff() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [found, setFound] = useState([]);
  const imgRef = useRef(null);

  const current = levels[levelIndex];

  const handleTap = (e) => {
    const rect = imgRef.current.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    current.spots.forEach((spot, i) => {
      if (found.includes(i)) return;

      const sx = (spot.left / 100) * width;
      const sy = (spot.top / 100) * height;

      const dist = Math.sqrt((clickX - sx) ** 2 + (clickY - sy) ** 2);

      if (dist < 40) {
        setFound([...found, i]);

        if (window.shashaSay)
          window.shashaSay("Great job! You found a difference!");
      }
    });
  };

  const navigate = useNavigate();

const nextLevel = () => {
  if (levelIndex < levels.length - 1) {
    setLevelIndex(levelIndex + 1);
    setFound([]);
  } else {
    alert("🎉 You completed all levels! Great job!");
    navigate("/games");
  }
};


  return (
    <div className="p-6 text-center bg-gradient-to-b from-blue-200 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Find The Difference 👀</h1>
      <h2 className="text-xl mb-4">Level {levelIndex + 1}: {current.title}</h2>

      <div className="flex justify-center gap-6 flex-wrap">

        <div className="p-3 bg-white rounded-xl shadow">
          <h3 className="mb-2 font-semibold">Picture 1</h3>
          <img src={current.left} className="w-[320px] rounded-xl" />
        </div>

        <div className="p-3 bg-white rounded-xl shadow relative">
          <h3 className="mb-2 font-semibold">Tap the differences</h3>

          <div className="relative w-[320px]" onClick={handleTap} ref={imgRef}>
            <img src={current.right} className="w-full rounded-xl" />

            {found.map((index) => {
              const spot = current.spots[index];
              return (
                <div
                  key={index}
                  className="absolute w-12 h-12 border-4 border-green-500 rounded-full bg-green-300/40 animate-pulse"
                  style={{
                    top: `${spot.top}%`,
                    left: `${spot.left}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 font-semibold">
        Found {found.length} / {current.spots.length}
      </p>

      <button
        disabled={found.length !== current.spots.length}
        onClick={nextLevel}
        className={`mt-4 px-6 py-3 text-lg rounded-full shadow 
        ${found.length === current.spots.length
          ? "bg-purple-600 text-white"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Next Level →
      </button>
    </div>
  );
 }
