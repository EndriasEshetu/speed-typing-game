type StatsProps = {
  timeLeft: number;
  wpm: number;
  accuracy: number;
};

export default function Stats({ timeLeft, wpm, accuracy }: StatsProps) {
  return (
    <div className="flex gap-6 flex-wrap">
      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-700 bg-[#22384b] px-6 py-3 shadow-[0_0_20px_rgba(0,0,0,0.55),inset_0_0_12px_rgba(85,145,191,0.18)] min-w-45">
        <p className="text-white text-lg md:text-xl font-semibold text-center">
          ⏱ {timeLeft}s
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-700 bg-[#22384b] px-6 py-3 shadow-[0_0_20px_rgba(0,0,0,0.55),inset_0_0_12px_rgba(85,145,191,0.18)] min-w-45">
        <p className="text-white text-lg md:text-xl font-semibold text-center">
          ⚡ {wpm} WPM
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-700 bg-[#22384b] px-6 py-3 shadow-[0_0_20px_rgba(0,0,0,0.55),inset_0_0_12px_rgba(85,145,191,0.18)] min-w-45">
        <p className="text-white text-lg md:text-xl font-semibold text-center">
          🎯 {accuracy}%
        </p>
      </div>
    </div>
  );
}
