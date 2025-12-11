export default function Congrats({ msg }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-3xl shadow-2xl text-center animate-bounce">
        <h1 className="text-3xl font-bold text-green-600 mb-3">🎉 Congrats! 🎉</h1>
        <p className="text-lg font-semibold">{msg}</p>
      </div>
    </div>
  );
}
