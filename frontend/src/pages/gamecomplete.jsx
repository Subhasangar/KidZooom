import { useEffect } from "react";
import { speak } from "../utils/speak";
import { fireConfetti } from "../utils/confetti";

export default function GameComplete() {
  useEffect(() => {
    fireConfetti();
    speak("You answered all correctly! Great job my little hero!");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-200">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        🎉 You Answered Everything Correctly! 🎉
      </h1>
      
      <p className="text-xl font-semibold text-green-700 mb-6">
        I’m proud of you! Keep learning with me! 💛
      </p>

      <img
        src="/success.gif"
        className="w-48 h-48 rounded-xl mb-6 shadow-lg"
        alt="congrats"
      />

      <div className="flex gap-4">
        <a
          href="/games"
          className="bg-white px-6 py-3 rounded-2xl text-lg font-bold shadow hover:scale-105 transition"
        >
          Play Again 🎮
        </a>

        <a
          href="/home"
          className="bg-yellow-300 px-6 py-3 rounded-2xl text-lg font-bold shadow hover:scale-105 transition"
        >
          Go Home 🏠
        </a>
      </div>
    </div>
  );
}
