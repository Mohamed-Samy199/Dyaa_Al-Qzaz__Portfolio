import { Zap } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 left-10 flex flex-col items-center gap-3 opacity-20 hidden md:flex z-10">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase rotate-90 origin-leftTranslate-x-3">
        Scroll
      </span>
      <div className="w-[1px] h-16 bg-white animate-pulse" />
      <Zap className="w-4 h-4 text-purple-500" />
    </div>
  );
};

export default ScrollIndicator;