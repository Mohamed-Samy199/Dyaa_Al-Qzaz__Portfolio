import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import PixelParticles2 from "../../../shared/PixelParticles2/PixelParticles2";

const ProjectCard = ({ project, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clickable image area */}
      <div
        onClick={() => onPlay(project)}
        className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-900 border border-white/5 shadow-2xl cursor-pointer"
      >
        {/* PixelParticles جوه الصورة مباشرة */}
        {isHovered && <PixelParticles2 isVideoOpen={false} />}

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
          <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform backdrop-blur-sm">
            <Play fill="black" size={28} className="ml-1" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase border border-white/20">
          {project.category}
        </div>

        {/* Year badge */}
        <div className="absolute top-6 right-6 px-3 py-1 bg-purple-600/80 backdrop-blur-md rounded-full text-[10px] font-bold">
          {project.year}
        </div>

        {/* Number watermark */}
        <div className="absolute bottom-6 right-6 text-white/10 font-black text-7xl leading-none select-none">
          {String(project.order).padStart(2, "0")}
        </div>
      </div>

      {/* Info row */}
      <div className="mt-6 flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500 uppercase tracking-widest font-mono border border-white/5 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onPlay(project)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 group-hover:border-transparent transition-all duration-500 ml-4"
        >
          <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;