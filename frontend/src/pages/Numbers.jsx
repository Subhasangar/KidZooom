import React from "react";
import { speak } from "../utils/speak";   

const numberWords = {
  1: "One 🥇",
  2: "Two ✌️",
  3: "Three 🤟",
  4: "Four 🍀",
  5: "Five ✋",
  6: "Six 🎱",
  7: "Seven 🌈",
  8: "Eight 🎱",
  9: "Nine 🕘",
  10: "Ten 🔟",
  11: "Eleven 1️⃣1️⃣",
  12: "Twelve 1️⃣2️⃣",
  13: "Thirteen 1️⃣3️⃣",
  14: "Fourteen 1️⃣4️⃣",
  15: "Fifteen 1️⃣5️⃣",
  16: "Sixteen 1️⃣6️⃣",
  17: "Seventeen 1️⃣7️⃣",
  18: "Eighteen 1️⃣8️⃣",
  19: "Nineteen 1️⃣9️⃣",
  20: "Twenty 2️⃣0️⃣",
  21: "Twenty One 2️⃣1️⃣",
  22: "Twenty Two 2️⃣2️⃣",
  23: "Twenty Three 2️⃣3️⃣",
  24: "Twenty Four 2️⃣4️⃣",
  25: "Twenty Five 2️⃣5️⃣",
  26: "Twenty Six 2️⃣6️⃣",
  27: "Twenty Seven 2️⃣7️⃣",
  28: "Twenty Eight 2️⃣8️⃣",
  29: "Twenty Nine 2️⃣9️⃣",
  30: "Thirty 3️⃣0️⃣",
  31: "Thirty One 3️⃣1️⃣",
  32: "Thirty Two 3️⃣2️⃣",
  33: "Thirty Three 3️⃣3️⃣",
  34: "Thirty Four 3️⃣4️⃣",
  35: "Thirty Five 3️⃣5️⃣",
  36: "Thirty Six 3️⃣6️⃣",
  37: "Thirty Seven 3️⃣7️⃣",
  38: "Thirty Eight 3️⃣8️⃣",
  39: "Thirty Nine 3️⃣9️⃣",
  40: "Forty 4️⃣0️⃣",
  41: "Forty One 4️⃣1️⃣",
  42: "Forty Two 4️⃣2️⃣",
  43: "Forty Three 4️⃣3️⃣",
  44: "Forty Four 4️⃣4️⃣",
  45: "Forty Five 4️⃣5️⃣",
  46: "Forty Six 4️⃣6️⃣",
  47: "Forty Seven 4️⃣7️⃣",
  48: "Forty Eight 4️⃣8️⃣",
  49: "Forty Nine 4️⃣9️⃣",
  50: "Fifty 5️⃣0️⃣",
};

export default function Numbers() {
  const handleNumberClick = (num) => {
    const msg = numberWords[num];

    if (window.shashaSay) window.shashaSay(msg);

    const cleanText = msg.replace(/[^a-zA-Z ]/g, " ").replace(/\s+/g, " ").trim();
    speak(cleanText);   
  };

  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-yellow-200 to-orange-300">
      <h1 className="text-center text-4xl font-bold mt-4 text-orange-800 drop-shadow">
        Numbers 1 to 50 🔢✨
      </h1>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mt-10 px-4">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-white p-4 rounded-2xl text-2xl font-bold
                       shadow-md hover:bg-yellow-300 hover:scale-110 
                       transition transform"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
