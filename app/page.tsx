"use client";

import { useEffect, useState, useRef } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

  const targetWords = currentText.split(" ");
  const typedWords = userInput.split(" ");

  let weightedScore = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const typedWord = typedWords[i];
    const targetWord = targetWords[i];

    if (!targetWord) break;

    const isCompleted = i < typedWords.length - 1 || isFinished;

    if (isCompleted && typedWord === targetWord) {
      const len = targetWord.length;
      if (len >= 1 && len <= 3) weightedScore += 1;
      else if (len >= 4 && len <= 6) weightedScore += 2;
      else if (len >= 7 && len <= 9) weightedScore += 3;
      else if (len >= 10) weightedScore += 5;
    }
  }

  const resetGame = (nextMode: Mode = mode) => {
    setUserInput("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsFinished(false);
    setHasStarted(false);
    setCurrentText(getRandomText(nextMode));
  };

  const startGame = () => {
    setHasStarted(true);
    setIsRunning(true);
    setTimeLeft(60);
    setUserInput("");
    setIsFinished(false);
    
    // Focus the input automatically after state updates
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value as Mode;

    setMode(selectedMode);
    resetGame(selectedMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStarted) return;

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
          hasStarted={hasStarted}
          inputRef={inputRef}
        />

        {!hasStarted ? (
          <button
            onClick={startGame}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition shadow-[0_0_24px_rgba(0,0,0,0.5)]"
          >
            START
          </button>
        ) : (
          <button
            onClick={() => resetGame()}
            className="mt-6 w-full bg-[#22384b] hover:bg-[#496781] text-white px-4 py-3 rounded-xl font-semibold transition shadow-[0_0_24px_rgba(0,0,0,0.5)]"
          >
            Restart Test
          </button>
        )}

        {isFinished && <ResultCard wpm={wpm} accuracy={accuracy} weightedScore={weightedScore} />}
      </section>
    </main>
  );
}
