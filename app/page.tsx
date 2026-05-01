"use client";

import { useEffect, useState } from "react";
import { paragraphs } from "../data/paragraphs";
import Header from "../components/Header";
import Stats from "../components/Stats";
import TypingArea from "../components/TypingArea";
import ResultCard from "../components/ResultCard";

type Mode = "easy" | "medium" | "hard";

function getRandomText(mode: Mode) {
  const randomIndex = Math.floor(Math.random() * paragraphs[mode].length);
  return paragraphs[mode][randomIndex];
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("easy");
  const [currentText, setCurrentText] = useState(() => paragraphs.easy[0]);
  const [userInput, setUserInput] = useState("");

  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

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

  const resetGame = (nextMode: Mode = mode) => {
    setUserInput("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsFinished(false);
    setCurrentText(getRandomText(nextMode));
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value as Mode;

    setMode(selectedMode);
    resetGame(selectedMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) setIsRunning(true);

    setUserInput(e.target.value);

    if (e.target.value === currentText) {
      setIsRunning(false);
      setIsFinished(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-200 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
        <Header />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <select
            value={mode}
            onChange={handleModeChange}
            className="bg-slate-200 px-4 py-2 rounded-xl outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <Stats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} />
        </div>

        <TypingArea
          currentText={currentText}
          userInput={userInput}
          onChange={handleInputChange}
          isFinished={isFinished}
        />

        <button
          onClick={() => resetGame()}
          className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-xl font-semibold transition"
        >
          Restart Test
        </button>

        {isFinished && <ResultCard wpm={wpm} accuracy={accuracy} />}
      </section>
    </main>
  );
}
