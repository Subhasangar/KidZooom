// src/components/ShashaGuide.jsx
import { useEffect, useState, useRef } from "react";
import shashaImg from "../assets/shashaimg.png";

export default function ShashaGuide() {
  const [message, setMessage] = useState(
    "Hi, I'm Shasha! Tap anything to start learning!"
  );
  const lastInteractionRef = useRef(Date.now());
  const preferredVoiceRef = useRef(null);

  const pickNiceVoice = () => {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const preferredNames = [
      "Google UK English Female",
      "Google US English",
      "Microsoft Sonia Online (Natural) - English (United Kingdom)",
      "Microsoft Aria Online (Natural) - English (United States)"
    ];

    for (const name of preferredNames) {
      const v = voices.find((voice) => voice.name.includes(name));
      if (v) return v;
    }
    const female = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("aria") ||
          v.name.toLowerCase().includes("samantha")||
          v.name.toLowerCase().includes("sonia"))
    );
    if (female) return female;

    return voices[0];
  };

  const speak = (text) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setMessage(text);
      return;
    }

    const synth = window.speechSynthesis;

    synth.cancel();

    if (!preferredVoiceRef.current) {
      preferredVoiceRef.current = pickNiceVoice();
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = preferredVoiceRef.current || null;
    utter.pitch = 1.9;   
    utter.rate = 0.75;   

    setMessage(text);
    synth.speak(utter);
  };

  // expose global helper
  useEffect(() => {
    window.shashaSay = (text) => {
      speak(text);
      lastInteractionRef.current = Date.now();
    };

    // preload voices once
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        preferredVoiceRef.current = pickNiceVoice();
      };
      preferredVoiceRef.current = pickNiceVoice();
    }

    return () => {
      delete window.shashaSay;
    };
  }, []);

  // greet on first load
  useEffect(() => {
    const id = setTimeout(() => {
      speak("Hi, I am Shasha! I will guide you. Let's start learning!");
    }, 1500);

    return () => clearTimeout(id);
  }, []);

  // idle reminder every 5 minutes (no repeat on every click)
  useEffect(() => {
    const updateActivity = () => {
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener("click", updateActivity);
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("touchstart", updateActivity);

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionRef.current >= 5 * 60 * 1000) {
        speak("I'm here to help you. Tap anything to learn with me!");
        lastInteractionRef.current = Date.now();
      }
    }, 30 * 100); 

    return () => {
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("touchstart", updateActivity);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2">
      <div className="max-w-xs bg-white/90 rounded-2xl shadow-lg px-4 py-3 text-sm font-semibold text-slate-800 border border-blue-200">
        {message}
      </div>

      <img
        src={shashaImg}
        alt="Shasha"
        className="w-24 sm:w-28 cursor-pointer drop-shadow-lg"
        onClick={() =>
          speak("Tell me what you want to learn, my little friend!")
        }
      />
    </div>
  );
}
