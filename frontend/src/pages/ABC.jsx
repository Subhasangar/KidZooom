// top-level
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const phonics = {
  A: "A for Apple 🍎",
  B: "B for Ball 🏀",
  C: "C for Cat 🐱",
  D: "D for Dog 🐶",
  E: "E for Elephant 🐘",
  F: "F for Fish 🐟",
  G: "G for Goat 🐐",
  H: "H for Hen 🐔",
  I: "I for IceCream 🍦",
  J: "J for Joker 🤡",
  K: "K for Kite 🪁",
  L: "L for Lion 🦁",
  M: "M for Monkey 🐒",
  N: "N for Nose 👃",
  O: "O for Orange 🍊",
  P: "P for Parrot 🦜",
  Q: "Q for Queen 👑",
  R: "R for Rabbit 🐰",
  S: "S for Sun ☀️",
  T: "T for Tiger 🐯",
  U: "U for Umbrella ☂️",
  V: "V for Violin 🎻",
  W: "W for Watch ⌚",
  X: "X for XmasTree 🎄",
  Y: "Y for Yak 🐂",
  Z: "Z for Zebra 🦓",
};

export default function ABC() {
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.2;
    utter.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const female = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("aria") ||
          v.name.toLowerCase().includes("samantha"))
    );
    if (female) utter.voice = female;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const handleLetterClick = (letter) => {
    const fullMessage = phonics[letter];          
    const parts = fullMessage.split(" ");
    const speakText = parts.slice(0, 3).join(" ");

    if (window.shashaSay) window.shashaSay(fullMessage);

    speak(speakText);
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mt-6">
      {letters.map((l) => (
        <button
          key={l}
          onClick={() => handleLetterClick(l)}
          className="bg-white rounded-2xl text-3xl font-bold py-4 shadow-md
                     hover:bg-yellow-200 hover:scale-110 transition"
        >
          {l}
        </button>
      ))}
    </div>
  );
}
