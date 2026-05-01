type StatsProps = {
  timeLeft: number;
  wpm: number;
  accuracy: number;
};

export default function Stats({ timeLeft, wpm, accuracy }: StatsProps) {
  return (
    <div className="flex gap-6 text-lg font-medium text-green-800">
      <p>⏱ {timeLeft}s</p>
      <p>⚡ {wpm} WPM</p>
      <p>🎯 {accuracy}%</p>
    </div>
  );
}
