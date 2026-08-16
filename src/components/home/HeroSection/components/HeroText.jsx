import { Award, Download, Play } from "lucide-react";

const HeroText = ({ textRef, badgeText, description, onDownloadCV, onOpenVideo }) => {
  return (
    <div ref={textRef}>
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
        <Award className="text-yellow-500 w-4 h-4" />
        <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">
          {badgeText || "Top Rated Freelancer"}
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 perspective-1000">
        {"Dyaa Al-Qzaz".split("").map((char, i) => (
          <span key={i} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-500 italic">
          Motion Storyteller
        </span>
      </h1>

      <p className="sub-text text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 border-l-2 border-purple-500/50 pl-6">
        {description ||
          "Transforming static ideas into dynamic visual experiences. I specialize in After Effects and high-end visual storytelling."}
      </p>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
        <button
          onClick={onDownloadCV}
          className="download-btn group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Download CV <Download size={18} />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <button
          onClick={onOpenVideo}
          className="cta-btn flex items-center gap-3 font-bold uppercase tracking-widest text-white/80 hover:text-purple-400 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all">
            <Play size={20} fill="currentColor" className="group-hover:text-purple-400" />
          </div>
          Watch Showreel
        </button>
      </div>
    </div>
  );
};

export default HeroText;