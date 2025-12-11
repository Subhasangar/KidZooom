import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fireConfetti } from "../utils/confetti";

const levelConfig = [
  { pairs: 2, size: "text-6xl", grid: "grid-cols-2" }, 
  { pairs: 3, size: "text-5xl", grid: "grid-cols-3" }, 
  { pairs: 4, size: "text-5xl", grid: "grid-cols-4" }, 
  { pairs: 5, size: "text-4xl", grid: "grid-cols-5" }, 
];

const emojis = ["🍎", "🍉", "🍕", "🍪", "🍓", "🍰", "🍌", "🥕", "🥚", "🍟"];

export default function GamesMemory() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [canFlip, setCanFlip] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const { pairs } = levelConfig[level];
    const selected = emojis.slice(0, pairs);
    const doubled = [...selected, ...selected];

    const shuffled = doubled
      .map((value) => ({ value, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);

    if (window.shashaSay) {
      window.shashaSay(
        level === 0
          ? "Tap any card to flip it! Match the two same emoji cards!"
          : `Level ${level + 1}! Match all the cards to win!`
      );
    }
  }, [level]);

  const handleFlip = (cardId) => {
    if (!canFlip || flipped.includes(cardId) || matched.includes(cardId)) return;

    setFlipped((prev) => [...prev, cardId]);

    if (flipped.length === 1) {
      setCanFlip(false);

      const firstCard = cards.find((c) => c.id === flipped[0]);
      const secondCard = cards.find((c) => c.id === cardId);

      if (firstCard.value === secondCard.value) {
     
        setMatched((prev) => [...prev, flipped[0], cardId]);
        fireConfetti();
        if (window.shashaSay) window.shashaSay("Great! They match!");

        setTimeout(() => {
          setFlipped([]);
          setCanFlip(true);
        }, 800);
      } else {
        // NOT MATCH ✖️
        if (window.shashaSay) window.shashaSay("Oops! Try again!");

        setTimeout(() => {
          setFlipped([]);
          setCanFlip(true);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      fireConfetti();

      if (window.shashaSay)
        window.shashaSay("Congratulations! You completed this level!");

      setTimeout(() => {
        if (level < 3) {
          setLevel(level + 1);
        } else {
          if (window.shashaSay)
            window.shashaSay(
              "Amazing! You finished ALL levels! Going back to games!"
            );
          navigate("/games");
        }
      }, 1800);
    }
  }, [matched]);

  const config = levelConfig[level];

  return (
    <div className="min-h-screen p-6 bg-pink-200 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-3">Memory Flip Game 🧠✨</h1>
      <h2 className="text-xl font-semibold mb-4">
        Level {level + 1} — Match the cards!
      </h2>

      {showTutorial && level === 0 && (
        <div className="bg-white rounded-2xl p-4 text-center shadow-lg mb-4 max-w-md">
          <h3 className="text-lg font-bold mb-2">How to Play</h3>
          <p>Tap two cards to flip them.</p>
          <p>If they match, they stay open!</p>
          <button
            onClick={() => setShowTutorial(false)}
            className="mt-3 px-5 py-2 bg-purple-500 text-white rounded-full shadow"
          >
            Start Playing
          </button>
        </div>
      )}

      <div
        className={`grid ${config.grid} gap-4 mt-4 bg-white/30 p-4 rounded-3xl shadow-xl`}
      >
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);

          return (
            <button
              key={card.id}
              className={`w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-xl 
                flex items-center justify-center bg-white shadow-lg border-2 border-pink-400
                transition-transform duration-300 ${
                  isFlipped ? "rotate-0" : "rotate-180"
                }`}
              onClick={() => handleFlip(card.id)}
            >
              <span className={`${config.size} transition-opacity duration-300`}>
                {isFlipped ? card.value : "❓"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
