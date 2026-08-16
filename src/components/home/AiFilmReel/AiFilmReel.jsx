import { useState, useRef } from "react";
import { Play, X, Clapperboard, Video } from "lucide-react";
import { gsap } from "gsap";
import { useReels } from "../../../hooks/reels/useReels";

const AiFilmReel = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const modalRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const { data: aiVideos } = useReels();

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.8, opacity: 0, filter: "blur(20px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.2)" }
        );
      }
    }, 10);
  };

  const handleCloseVideo = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setSelectedVideo(null);
          document.body.style.overflow = "auto";
        },
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[600px] h-[350px] sm:h-[500px] md:h-[600px] bg-purple-600/10 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full mb-12 sm:mb-16 z-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4">
            <Clapperboard className="text-purple-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs font-mono text-purple-300 uppercase tracking-widest">
              CINEMATIC TAPE ARCHIVE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
            AI Generative <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 italic">
              Film Reels
            </span>
          </h2>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md font-mono mx-auto md:mx-0">
          A curated selection of cinematic generative video reels crafted with state-of-the-art AI engines.
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 md:space-y-8 z-10">
        {aiVideos?.map((item) => (
          <div
            key={item._id}
            onClick={() => handleOpenVideo(item)}
            className="group relative bg-[#121212] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden shadow-2xl cursor-pointer hover:border-purple-500/60 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 backdrop-blur-xl"
          >
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/80 border-r border-white/10 hidden lg:flex flex-col justify-around py-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 bg-white/20 mx-auto rounded-sm" />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-3 sm:gap-4 relative z-10 w-full md:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg shrink-0">
                <Video size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-teal-500/25 inline-block mb-1">
                  REEL_{String(item.order).padStart(2, "0")} // {item.category}
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 relative z-10 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
              <span className="text-[11px] sm:text-xs font-mono text-gray-400">DURATION: {item.duration}</span>
              <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-purple-500 group-hover:bg-purple-500/20 transition-all text-white font-mono text-xs uppercase tracking-wider">
                <Play size={14} fill="currentColor" className="text-purple-400 group-hover:text-white sm:w-4 sm:h-4" />
                <span>Play Reel</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={handleCloseVideo} />

          <div
            ref={modalRef}
            className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.4)] bg-black z-10"
          >
            <button
              onClick={handleCloseVideo}
              className="absolute top-3 right-3 sm:top-4 sm:h-auto sm:right-4 z-30 p-2 sm:p-3 bg-black/60 hover:bg-red-500 rounded-full text-white transition-all border border-white/10"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>

            <video
              ref={videoPlayerRef}
              src={selectedVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-purple-600/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-white text-[10px] sm:text-xs font-mono border border-white/10 max-w-[70%] truncate">
              {selectedVideo.title} • <span className="text-teal-300">{selectedVideo.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AiFilmReel;