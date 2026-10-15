import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="min-h-[100svh] bg-[#F4EDDE] text-[#1F2C46] flex flex-col justify-end px-5 md:px-10 pb-12 pt-32">
      <p className="text-[11px] tracking-mega text-[#E76B46]">ROOM NOT FOUND</p>
      <h1 className="display leading-[0.85] text-[32vw] md:text-[18vw] mt-2">404<span className="text-[#E76B46]">.</span></h1>
      <p className="text-[#1F2C46]/70 text-sm max-w-sm mt-4">This room doesn't exist in the exhibition. The work is all still here, though.</p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Link to="/" className="bg-[#E76B46] text-bone px-7 py-3.5 min-h-[48px] flex items-center text-xs tracking-mega hover:bg-[#1F2C46] hover:text-[#F4EDDE] transition-colors">BACK TO THE ENTRANCE</Link>
        <Link to="/worlds" className="border border-[#1F2C46]/40 px-7 py-3.5 min-h-[48px] flex items-center text-xs tracking-mega hover:border-[#E76B46] hover:text-[#E76B46] transition-colors">EXPLORE THE WORK</Link>
      </div>
    </main>
  );
}
