import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1e2f40] shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
          <Image src="/elogo.png" alt="Endrias Logo" fill className="object-cover" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">SpeedType</span>
      </div>
      <div className="flex gap-6 text-slate-300 font-medium">
        <a href="#" className="hover:text-white transition">Play</a>
        <a href="#contact" className="hover:text-white transition">Contact</a>
      </div>
    </nav>
  );
}
