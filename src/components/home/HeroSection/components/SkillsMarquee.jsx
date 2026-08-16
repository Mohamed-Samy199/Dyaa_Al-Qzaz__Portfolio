import { SKILLS } from "../constants";

const SkillsMarquee = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full py-3 md:py-6 bg-white/5 border-t border-white/5 backdrop-blur-md overflow-hidden whitespace-nowrap z-10">
      <div className="flex animate-marquee gap-20">
        {[...SKILLS, ...SKILLS].map((skill, i) => (
          <span key={i} className="text-white/20 text-4xl font-black italic">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;