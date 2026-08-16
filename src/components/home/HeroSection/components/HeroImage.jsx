import { MousePointer2, Radio } from "lucide-react";
import { ORBIT_ICONS } from "../constants";
import defaultImage from "../../../../assets/logo/dyaaqzaz.webp";

const HeroImage = ({ imageRef, orbitRef, heroImage, isAvailable }) => {
  return (
    <div className="relative flex justify-center items-center perspective-2000">
      <div ref={orbitRef} className="absolute w-[115%] h-[115%] opacity-50">
        {ORBIT_ICONS.map(({ src, alt, className }) => (
          <div key={alt} className={className}>
            <div className="bg-[#1e1e1e] p-3 rounded-2xl border border-white/10 shadow-2xl">
              <img src={src} className="w-8 h-8" alt={alt} />
            </div>
          </div>
        ))}
      </div>

      <div
        ref={imageRef}
        className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] z-10 transform-style-3d group"
      >
        <div
          className="absolute inset-0 opacity-20 z-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <img src={heroImage || defaultImage} alt="Dyaa Al-Qzaz" className="w-full h-full object-cover" />

        <div className="absolute top-3 left-3 z-30 text-[9px] font-mono text-white/50 space-y-1">
          <div className="flex items-center gap-1">
            <Radio size={8} className="text-red-500 animate-pulse" /> LIVE RENDERING
          </div>
          <div>FRM: 24fps</div>
        </div>

        <div className="absolute bottom-3 right-3 z-30 text-[9px] font-mono text-white/50 italic">
          STORYTELLER_01
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      {isAvailable && (
        <div className="floating-decor absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl hidden md:block z-30">
          <div className="flex items-center gap-3 text-black font-black text-sm uppercase">
            <div className="bg-teal-500 w-3 h-3 rounded-full animate-ping" />
            Available
          </div>
        </div>
      )}

      <MousePointer2 className="floating-decor absolute -top-10 -left-10 text-purple-500 w-12 h-12 opacity-50 z-30" />
    </div>
  );
};

export default HeroImage;