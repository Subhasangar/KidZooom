import { Link } from "react-router-dom";

export default function Games() {
  const say = (msg) => {
    if (window.shashaSay) window.shashaSay(msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-400 flex flex-col items-center p-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-8 drop-shadow">
        Fun Games 🎮
      </h1>
      <p className="text-white/90 mt-2 mb-8 text-center">
        Choose a game and Shasha will play with you!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link
          to="/games/quiz"         
          onClick={() =>
            say("Let’s play the quiz game! Look at the picture and pick the right answer.")
          }
          className="bg-white/95 rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-3">🧠</div>
          <h2 className="text-xl font-bold text-indigo-700">Picture Quiz</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            See the picture and choose the correct word!
          </p>
        </Link>

        <Link
          to="/games/diff"      
          onClick={() =>
            say("Let’s play find the difference. Look carefully at both pictures!")
          }
          className="bg-white/95 rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-3">👀</div>
          <h2 className="text-xl font-bold text-indigo-700">
            Find the Difference
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Tap on all the small changes between the two pictures.
          </p>
        </Link>

        <Link
          to="/games/memory"     
          onClick={() =>
            say("Let’s play the memory flip game! Try to match the same emoji cards.")
          }
          className="bg-white/95 rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="text-5xl mb-3">🧩</div>
          <h2 className="text-xl font-bold text-indigo-700">Memory Flip</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Flip the cards and match the same yummy food emojis!
          </p>
        </Link>
      </div>
    </div>
  );
}
