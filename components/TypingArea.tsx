type TypingAreaProps = {
  currentText: string;
  userInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFinished: boolean;
};

export default function TypingArea({
  currentText,
  userInput,
  onChange,
  isFinished,
}: TypingAreaProps) {
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
    <div>
      <div className="bg-slate-200 p-6 rounded-2xl mb-6 leading-8 text-lg min-h-auto">
        {renderColoredText()}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={onChange}
        disabled={isFinished}
        placeholder={isFinished ? "Test finished!" : "Start typing here..."}
        className="w-full bg-slate-200 px-4 py-3 rounded-xl outline-none text-lg disabled:opacity-50"
      />
    </div>
  );
}
