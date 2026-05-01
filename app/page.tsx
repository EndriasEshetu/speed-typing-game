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
    <main className="min-h-screen bg-[#496781] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-4xl bg-[#203547] rounded-3xl shadow-xl p-8">
        <Header />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <select
            value={mode}
            onChange={handleModeChange}
            className="rounded-md border border-slate-700 bg-[#22384b] px-4 py-2 text-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
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
          className="mt-6 w-full bg-[#22384b] hover:bg-[#496781] text-white px-4 py-3 rounded-xl font-semibold transition shadow-[0_0_24px_rgba(0,0,0,0.5)]"
        >
          Restart Test
        </button>

        {isFinished && <ResultCard wpm={wpm} accuracy={accuracy} />}
      </section>
    </main>
  );
}
