import { useEffect, useState } from "react";

const videos = [
  {
    id: "e_04ZrNroTo",
    title: "Rhyme 1",
    description: "Fun kids rhyme number 1 🎵",
  },
  {
    id: "020g-0hhCAU",
    title: "Rhyme 2",
    description: "Sing and dance with this song 🎶",
  },
  {
    id: "nS2kHvA1V_0",
    title: "Rhyme 3",
    description: "Enjoy this cute kids rhyme 🎧",
  },
  {
    id: "MKpXqSVV834",
    title: "Rhyme 4",
    description: "Learn and play with music 🧸",
  },
  {
    id: "uwzViw-T0-A",
    title: "Rhyme 5",
    description: "Colorful and happy rhyme 🌈",
  },
  {
    id: "jKi2SvWOCXc",
    title: "Rhyme 6",
    description: "Clap and sing along 👏",
  },
  {
    id: "wlcDkOpkK_E",
    title: "Rhyme 7",
    description: "Let’s learn with this song 📚",
  },
  {
    id: "3QzT1sq6kCY",
    title: "Rhyme 8",
    description: "One more lovely rhyme for kids 💛",
  },
];

export default function Videos() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  useEffect(() => {
    if (window.shashaSay) {
      window.shashaSay(
        "Welcome to rhymes and songs! Tap any card to play a video."
      );
    }
  }, []);

  const handleSelect = (video) => {
    setCurrentVideo(video);
    if (window.shashaSay) {
      window.shashaSay(`Now playing: ${video.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 to-orange-300 p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 drop-shadow">
        Rhymes & Songs 🎵
      </h1>
      <p className="text-white/90 mt-1 mb-4 text-center">
        Tap a video card and enjoy learning with music!
      </p>

      {/* Main video player */}
      <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          key={currentVideo.id}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0`}
          title={currentVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p className="mt-3 text-lg font-semibold text-white drop-shadow">
        {currentVideo.title}
      </p>
      <p className="text-sm text-white/90 mb-4">{currentVideo.description}</p>

      {/* 8 video cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleSelect(video)}
            className="bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-2 flex flex-col"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-3xl text-white">
                ▶
              </div>
            </div>
            <div className="mt-2 text-left px-1 pb-1">
              <h2 className="text-sm font-bold text-pink-700">
                {video.title}
              </h2>
              <p className="text-[11px] text-gray-500">
                {video.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
