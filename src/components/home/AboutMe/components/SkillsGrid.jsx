import { getIconComponent } from "../../../../constants/icons";

const SkillsGrid = ({ skills }) => {
  if (!skills.length) return null;

  return (
    <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
      {skills.map(({ icon, title, description }, i) => {
        const Icon = getIconComponent(icon);
        return (
          <div
            key={i}
            className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/[0.02] transition-colors group/skill"
          >
            <div className="p-3 bg-teal-600/10 rounded-lg text-teal-400 group-hover/skill:bg-teal-600/20 transition-colors">
              <Icon />
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-1">
                {title}
              </h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsGrid;