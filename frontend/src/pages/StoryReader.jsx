import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { stories } from "../data/stories";

export default function StoryReader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const story = stories.find((s) => s.id === id);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!story) return;
    if (window.shashaSay) {
      window.shashaSay(`We are reading: ${story.title}. Tap next to continue.`);
    }
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <p className="text-lg mb-4">Story not found.</p>
        <button
          onClick={() => navigate("/stories")}
          className="px-4 py-2 rounded-full bg-purple-500 text-white"
        >
          Back to Stories
        </button>
      </div>
    );
  }

  const page = story.pages[pageIndex];

  const speakPage = () => {
    if (window.shashaSay) {
      window.shashaSay(page.text);
    }
  };

  const goNext = () => {
    if (pageIndex < story.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      // end of story
      if (window.shashaSay) {
        window.shashaSay(
          `The end! That was the story: ${story.title}. Let's pick another one!`
        );
      }
      navigate("/stories");
    }
  };

  const goPrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-rose-200 p-4 sm:p-6 flex flex-col items-center">
      <button
        onClick={() => navigate("/stories")}
        className="self-start mb-3 px-3 py-1 rounded-full bg-white/70 text-sm shadow"
      >
        ← Back to Stories
      </button>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-900 mb-2 text-center">
        {story.title}
      </h1>
      <p className="text-purple-700/80 mb-4 text-center text-sm">
        Page {pageIndex + 1} of {story.pages.length}
      </p>

      {/* Story “page” card */}
      <div className="bg-white/90 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-xl w-full flex flex-col items-center">
        <div className="text-7xl mb-4">{page.emoji}</div>
        <p className="text-base sm:text-lg text-slate-800 text-center leading-relaxed">
          {page.text}
        </p>

        <button
          onClick={speakPage}
          className="mt-4 px-4 py-2 rounded-full bg-purple-500 text-white text-sm sm:text-base shadow hover:bg-purple-600"
        >
          🔊 Shasha, read this page
        </button>
      </div>

      {/* Controls */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={goPrev}
          disabled={pageIndex === 0}
          className={`px-4 py-2 rounded-full text-sm sm:text-base shadow ${
            pageIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-purple-800"
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 rounded-full text-sm sm:text-base shadow bg-purple-600 text-white"
        >
          {pageIndex === story.pages.length - 1 ? "Finish Story →" : "Next Page →"}
        </button>
      </div>
    </div>
  );
}
