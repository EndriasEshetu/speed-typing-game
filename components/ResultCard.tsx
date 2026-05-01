type ResultCardProps = {
  wpm: number;
  accuracy: number;
};

export default function ResultCard({ wpm, accuracy }: ResultCardProps) {
  return (
    <div className="mt-6 text-center bg-green-50 rounded-2xl p-6 border border-green-200">
      <h2 className="text-2xl font-bold text-green-700">Test Completed 🎉</h2>

      <p className="mt-3 text-lg">Final WPM: {wpm}</p>
      <p className="text-lg">Final Accuracy: {accuracy}%</p>
    </div>
  );
}
