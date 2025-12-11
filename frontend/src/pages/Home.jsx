import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, positionalKeys } from "framer-motion";

const items = [
  {
    name: "ABC",
    emoji: "🔤",
    url: "/abc",
    tip: "Let’s learn letters A to Z together!",
  },
  {
    name: "Numbers",
    emoji: "🔢",
    url: "/numbers",
    tip: "Tap here to count and play with numbers!",
  },
  {
    name: "Games",
    emoji: "🎮",
    url: "/games",
    tip: "Fun learning games are waiting for you here!",
  },
  {
    name: "Videos",
    emoji: "🎬",
    url: "/videos",
    tip: "Watch fun and Rhymes videos here!",
  },
  {
    name: "Stories",
    emoji: "📚",
    url: "/stories",
    tip: "Listen to cute bedtime and moral stories here!",
  },
  {
    name:"About",
    emoji:" ℹ ",
    url:"/about",
  }
  
];

export default function Home() {
    useEffect(() => {
    if (window.shashaSay) {
      window.shashaSay(
        "Hi, I'm Shasha! This is your home page. Tap any card to start learning!"
      );
    }
  }, []);

  const handleInteract = (item) => {
    if (window.shashaSay) {
      window.shashaSay(item.tip);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 flex flex-col items-center p-5 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-pink-200/40 blur-3xl" />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-white mt-10 drop-shadow-lg"
      >
        Welcome Kids! 🧸✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white text-lg mb-6"
      >
        Let&apos;s learn &amp; play with Shasha the teacher! 🎉
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            whileHover={{ scale: 1.07, rotate: 1.5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => handleInteract(item)}
            onClick={() => handleInteract(item)}
          >
            <Link
              to={item.url}
              className="block bg-white/95 p-6 rounded-3xl shadow-xl hover:shadow-2xl text-center border border-white/60 backdrop-blur"
            >
              <div className="text-6xl mb-2">{item.emoji}</div>
              <h2 className="text-2xl font-bold text-blue-700">
                {item.name}
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                Tap to explore {item.name.toLowerCase()}!
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
