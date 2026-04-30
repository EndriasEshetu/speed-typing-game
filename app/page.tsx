export default function Home() {
  return (
    <main className="min-h-screen bg-slate-300 text-black flex items-center justify-center px-4">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl text-green-600 font-bold text-center mb-8">
          Speed Typing Game
        </h1>

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <select className="bg-slate-300 px-4 py-2 rounded-lg outline-none">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <div className="flex gap-6 text-lg">
            <p>Time: 60</p>
            <p>WPM: 0</p>
            <p>Accuracy: 0%</p>
          </div>
        </div>

        {/* Typing Text */}
        <div className="bg-slate-300 p-6 rounded-xl mb-6 leading-8 text-lg">
          The quick brown fox jumps over the lazy dog.
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Start typing here..."
          className="w-full bg-slate-300 px-4 py-3 rounded-xl outline-none text-lg"
        />

        {/* Restart */}
        <button className="mt-6 w-full bg-green-900 hover:bg-green-700 text-white  px-4 py-3 rounded-xl font-semibold">
          Restart Game
        </button>
      </section>
    </main>
  );
}
