type ResultCardProps = {
  wpm: number;
  accuracy: number;
};

export default function ResultCard({ wpm, accuracy }: ResultCardProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-6 text-center text-white bg-[#5b5b5b] rounded-2xl p-6  border-4 border-[#454545] shadow-[0_0_24px_rgba(0,0,0,0.5)]">
      <h2 className="text-2xl font-bold ">Test Completed 🎉</h2>

      <p className="mt-3 text-lg ">Final WPM: {wpm}</p>
      <p className="text-lg ">Final Accuracy: {accuracy}%</p>
    </div>
  );
}
