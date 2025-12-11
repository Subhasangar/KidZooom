import { useState } from "react";
import axios from "axios";

export default function About() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/api/feedback", form); // update port if needed
      setStatus("Thank you! Your feedback has been sent ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-purple-200 flex flex-col items-center p-6 gap-6">
      <div className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-3">
          About KidZooom ✨
        </h1>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          KidZooom is a playful kids learning platform with ABC, numbers,
          games, stories and rhymes. Children learn with our friendly guide
          Shasha in a safe, colorful and interactive way.
        </p>

        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl font-bold text-purple-700 mb-1">
            Developer 👨‍💻
          </h2>
          <p className="text-slate-800 font-semibold">Subhasangar S</p>
          <p className="text-sm text-slate-600 mt-1">
            Full Stack Developer & Creator of KidZooom
          </p>
          <p className="text-sm text-slate-700 mt-2">
            Email:{" "}
            <a
              href="mailto:your-email@example.com"
              className="text-blue-600 underline"
            >
              ssubhasangar@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          Feedback & Suggestions 💬
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Share your ideas, issues or comments here. Your message will be sent
          directly to my email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Your Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type your feedback here..."
            />
          </div>

          <button
            type="submit"
            className="mt-1 px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
          >
            Send Feedback ✉️
          </button>
        </form>

        {status && (
          <p className="mt-3 text-sm font-semibold text-slate-700">{status}</p>
        )}
      </div>
    </div>
  );
}
