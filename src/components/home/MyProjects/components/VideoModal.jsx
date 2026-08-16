import { X } from "lucide-react";

const VideoModal = ({ project, videoModalRef, videoRef, onClose }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl">
    {/* Backdrop click */}
    <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

    <div
      ref={videoModalRef}
      className="relative w-[90%] max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-black"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10001] p-3 bg-black/50 hover:bg-red-500 rounded-full text-white transition-all"
      >
        <X size={24} />
      </button>

      {/* Video */}
      <video ref={videoRef} controls playsInline className="w-full h-full object-contain">
        <source src={project.video} type="video/webm" />
        <source src={project.video.replace(".webm", ".mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title badge */}
      <div className="absolute top-4 left-4 z-30 bg-purple-600/80 px-4 py-2 rounded-lg text-white text-xs font-mono backdrop-blur-md">
        {project.title.toUpperCase()} • {project.year}
      </div>

      {/* Category badge */}
      <div className="absolute bottom-4 left-4 z-30 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg text-white text-xs border border-white/20">
        {project.category}
      </div>

      {/* Tags */}
      <div className="absolute bottom-4 right-4 z-30 flex gap-2">
        {project.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="px-3 py-1.5 bg-purple-600/80 backdrop-blur-md rounded-full text-[10px] font-mono text-white">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default VideoModal;