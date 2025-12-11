
// src/pages/Stories.jsx
import { Link } from "react-router-dom";
import { stories } from "../data/stories";

export default function Stories() {
  const say = (msg) => {
    if (window.shashaSay) window.shashaSay(msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 drop-shadow">
        Story Time 📖
      </h1>
      <p className="text-white/90 mt-1 mb-6 text-center">
        Choose a story and I will read it for you!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {stories.map((story) => (
          <Link
            key={story.id}
            to={`/stories/${story.id}`}
            onClick={() =>
              say(`Let’s read the story: ${story.title}`)
            }
            className={`bg-gradient-to-br ${story.theme} rounded-3xl shadow-xl p-5 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition`}
          >
            <div className="text-6xl mb-3">{story.coverEmoji}</div>
            <h2 className="text-xl font-bold text-purple-900 text-center">
              {story.title}
            </h2>
            <p className="text-sm text-purple-800/80 mt-1 text-center">
              {story.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
