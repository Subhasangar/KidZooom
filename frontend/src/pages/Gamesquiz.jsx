import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { speak } from "../utils/speak";
import { fireConfetti } from "../utils/confetti";
import Congrats from "../components/congrats";

const levels = [
  { img: "/assets/apple.png", answer: "Apple", options: ["Apple", "Ball", "Cat", "Dog"] },
  { img: "/assets/ball.png", answer: "Ball", options: ["Lion", "Ball", "Fish", "Egg"] },
  { img: "/assets/cat.png", answer: "Cat", options: ["Cat", "Dog", "Hen", "Goat"] },
  { img: "/assets/dog.png", answer: "Dog", options: ["Cow", "Tiger", "Dog", "Lion"] },
  { img: "/assets/lion.png", answer: "Lion", options: ["Lion", "Cat", "Goat", "Frog"] },
  { img: "/assets/book.png", answer: "Book", options: ["Book", "Note", "Pen", "Paper"] },
  { img: "/assets/bird.png", answer: "Bird", options: ["Fish", "Dog", "Bird", "Cat"] },
  { img: "/assets/car.png", answer: "Car", options: ["Bus", "Car", "Bike", "Truck"] },
  { img: "/assets/sun.png", answer: "Sun", options: ["Moon", "Star", "Cloud", "Sun"] },
  { img: "/assets/star.png", answer: "Star", options: ["Star", "Dog", "Fish", "Sun"] },
  { img: "/assets/bus.png", answer: "Bus", options: ["Car", "Bus", "Bike", "Ship"] },
  { img: "/assets/tv.png", answer: "TV", options: ["Speaker", "Computer", "Light", "TV"] },
  { img: "/assets/banana.png", answer: "Banana", options: ["Apple", "Cat", "Banana", "Carrot"] },
];

export default function Gamequiz() {
  const [level, setLevel] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  const q = levels[level];

  const handleClick = (option) => {
    if (option === q.answer) {
      fireConfetti();
      speak("Correct! Great job!");
      setShowCongrats(true);

      setTimeout(() => {
        setShowCongrats(false);

        if (level < levels.length - 1) {
         
          setLevel(level + 1);
        } else {

          speak("You completed all quiz levels! Amazing job!");
          navigate("/games");
        }
      }, 2000);
    } else {
      speak("Oops! Try again!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-yellow-200">
      {showCongrats && <Congrats msg="Correct Answer!" />}

      <h1 className="text-3xl font-bold text-center">What is it❓</h1>

      <div className="flex justify-center mt-6">
        <img src={q.img} className="w-40 h-40 rounded-xl shadow-xl" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 px-8">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            className="bg-white p-4 text-xl shadow-md rounded-2xl hover:scale-105"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
