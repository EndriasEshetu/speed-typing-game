type TypingAreaProps = {
  currentText: string;
  userInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFinished: boolean;
  hasStarted: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export default function TypingArea({
  currentText,
  userInput,
  onChange,
  isFinished,
  hasStarted,
  inputRef,
}: TypingAreaProps) {
  const renderColoredText = () => {
    const targetWords = currentText.split(" ");
    const currentWordIndex = userInput.split(" ").length - 1;
    const chunkSize = 10;
    const currentChunkIndex = Math.floor(currentWordIndex / chunkSize);

    const prevWordsStr = targetWords.slice(0, currentChunkIndex * chunkSize).join(" ");
    const charStartIndex = prevWordsStr.length > 0 ? prevWordsStr.length + 1 : 0;

    const chunkString = targetWords
      .slice(currentChunkIndex * chunkSize, (currentChunkIndex + 1) * chunkSize)
      .join(" ");

    return chunkString.split("").map((char, index) => {
      const absoluteCharIndex = charStartIndex + index;
      let color = "text-gray-500";

      if (absoluteCharIndex < userInput.length) {
        color = userInput[absoluteCharIndex] === char ? "text-green-600" : "text-red-600";
      }

      return (
        <span key={absoluteCharIndex} className={color}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-md border border-slate-700 bg-[#22384b] px-6 md:px-10 py-8 md:py-10 text-center text-white text-xl md:text-3xl font-medium shadow-[0_0_24px_rgba(0,0,0,0.5)]">
        {renderColoredText()}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={onChange}
        disabled={isFinished || !hasStarted}
        placeholder={isFinished ? "Test finished!" : (!hasStarted ? "Click START to begin..." : "Start typing here...")}
        className="rounded-md border border-slate-700 bg-[#22384b] px-6 md:px-10 py-8 md:py-10 text-white text-xl md:text-3xl shadow-[0_0_24px_rgba(0,0,0,0.5)] disabled:opacity-50"
      />
    </div>
  );
}
