"use client";

import { useEffect, useState } from "react";
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

  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Stop the game when timer reaches 0 from within the updater
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Performance calculations
  const correctChars = currentText
    .split("")
    .filter((char, index) => userInput[index] === char).length;

  const timeElapsed = 60 - timeLeft;

  const wpm =
    timeElapsed > 0 ? Math.round((correctChars / 5 / timeElapsed) * 60) : 0;

  const accuracy =
    userInput.length > 0
      ? Math.round((correctChars / userInput.length) * 100)
      : 0;

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value as Mode;

    setMode(selectedMode);
    setCurrentText(getRandomText(selectedMode));
    resetGame();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) setIsRunning(true);

    setUserInput(e.target.value);

    // If user finishes paragraph before timer ends
    if (e.target.value === currentText) {
      setIsRunning(false);
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setUserInput("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsFinished(false);
    setCurrentText(getRandomText(mode));
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

        {/* Controls */}
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

          <div className="flex gap-6 text-lg font-medium">
            <p>Time: {timeLeft}</p>
            <p>WPM: {wpm}</p>
            <p>Accuracy: {accuracy}%</p>
          </div>
        </div>

        {/* Typing text */}
        <div className="bg-slate-300 p-6 rounded-xl mb-6 leading-8 text-lg min-h-[120px]">
          {renderColoredText()}
        </div>

        {/* Input */}
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder={isFinished ? "Test finished!" : "Start typing here..."}
          className="w-full bg-slate-300 px-4 py-3 rounded-xl outline-none text-lg disabled:opacity-50"
        />

        {/* Restart */}
        <button
          onClick={resetGame}
          className="mt-6 w-full bg-green-900 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold"
        >
          Restart Test
        </button>

        {/* Game Over Message */}
        {isFinished && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-green-700">
              Test Completed 🎉
            </h2>
            <p className="mt-2">Final WPM: {wpm}</p>
            <p>Final Accuracy: {accuracy}%</p>
          </div>
        )}
      </section>
    </main>
  );
}
