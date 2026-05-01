"use client";

import { useState } from "react";
import { paragraphs } from "../data/paragraphs";

type Mode = "easy" | "medium" | "hard";

function getRandomText(mode: Mode) {
  const randomIndex = Math.floor(Math.random() * paragraphs[mode].length);
  return paragraphs[mode][randomIndex];
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("easy");
  const [currentText, setCurrentText] = useState(() => getRandomText("easy"));
  const [userInput, setUserInput] = useState("");

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value as Mode;

    setMode(selectedMode);
    setCurrentText(getRandomText(selectedMode));
    setUserInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const renderColoredText = () => {
    return currentText.split("").map((char, index) => {
      let color = "text-gray-500";

      if (index < userInput.length) {
        color = userInput[index] === char ? "text-green-600" : "text-red-600";
      }

      return (
        <span key={index} className={color}>
          {char}
        </span>
      );
    });
  };

  return (
    <main className="min-h-screen bg-slate-300 text-black flex items-center justify-center px-4">
      <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl text-green-600 font-bold text-center mb-8">
          Speed Typing Game
        </h1>

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <select
            value={mode}
            onChange={handleModeChange}
            className="bg-slate-300 px-4 py-2 rounded-lg outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="flex gap-6 text-lg">
            <p>Time: 60</p>
            <p>WPM: 0</p>
            <p>Accuracy: 0%</p>
          </div>
        </div>

        {/* Typing Text */}
        <div className="bg-slate-300 p-6 rounded-xl mb-6 leading-8 text-lg min-h-[120px]">
          {renderColoredText()}
        </div>

        {/* Input */}
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          className="w-full bg-slate-300 px-4 py-3 rounded-xl outline-none text-lg"
        />

        {/* Restart */}
        <button
          onClick={() => setUserInput("")}
          className="mt-6 w-full bg-green-900 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold"
        >
          Restart Test
        </button>
      </section>
    </main>
  );
}
