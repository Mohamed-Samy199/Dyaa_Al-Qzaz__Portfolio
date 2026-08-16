import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import PixelParticles from "../../shared/PixelParticles/PixelParticles";

/* ─── Thumbnail Lightbox (خاص بـ THUMBNAIL DESIGN فقط) ─── */
const ThumbnailLightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      imgRef.current,
      { scale: 0.88, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
    );
  }, []);

  const animateChange = useCallback((direction) => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      x: direction === "next" ? -60 : 60,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCurrent((prev) => {
          const next =
            direction === "next"
              ? (prev + 1) % images.length
              : (prev - 1 + images.length) % images.length;
          return next;
        });
        gsap.fromTo(
          imgRef.current,
          { x: direction === "next" ? 60 : -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
        );
      },
    });
  }, [images.length]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") animateChange("prev");
      if (e.key === "ArrowLeft") animateChange("next");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [animateChange, onClose]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={handleClose}
    >
      {/* زر الإغلاق */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-[210] p-2 bg-white/5 hover:bg-red-600 border border-white/10 rounded-full text-white transition-all duration-300"
      >
        <X size={24} />
      </button>

      {/* عداد الصور */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[210]">
        <span className="font-mono text-xs text-white/40 tracking-widest">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* زر السابق */}
      <button
        onClick={(e) => { e.stopPropagation(); animateChange("prev"); }}
        className="absolute left-4 md:left-8 z-[210] p-3 bg-white/5 hover:bg-teal-600 border border-white/10 rounded-full text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={28} />
      </button>

      {/* الصورة */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-[210] flex flex-col items-center gap-4 px-16 max-w-5xl w-full"
      >
        <img
          ref={imgRef}
          src={images[current].thumbnail}
          alt={images[current].title}
          className="w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
        />
        <p className="text-white/60 text-sm font-mono tracking-wider text-center">
          {images[current].title}
        </p>

        {/* Dots */}
        <div className="flex gap-2 mt-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > current ? "next" : "prev";
                setCurrent(i);
                gsap.fromTo(imgRef.current,
                  { x: dir === "next" ? 60 : -60, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
                );
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-teal-400 scale-125" : "bg-white/20"
                }`}
            />
          ))}
        </div>
      </div>

      {/* زر التالي */}
      <button
        onClick={(e) => { e.stopPropagation(); animateChange("next"); }}
        className="absolute right-4 md:right-8 z-[210] p-3 bg-white/5 hover:bg-teal-600 border border-white/10 rounded-full text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

/* ─── PortfolioModal الرئيسي ─── */
const PortfolioModal = ({ isOpen, onClose, service }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const [activeLocalVideo, setActiveLocalVideo] = useState(null);
  const [hoveredCardRef, setHoveredCardRef] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = закрыт

  // const isThumbnail = service?.title === "THUMBNAIL DESIGN";
  const isThumbnail = service?.label === "THUMBNAIL DESIGN";

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { opacity: 1, pointerEvents: "all", duration: 0.4, ease: "power2.out" });
      gsap.to(contentRef.current, { opacity: 1, duration: 0.4, delay: 0.1 });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(modalRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
      setActiveLocalVideo(null);
      setHoveredCardRef(null);
      setLightboxIndex(null);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeLocalVideo && videoContainerRef.current) {
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.8, opacity: 0, rotationY: -20, filter: "blur(10px)" },
        {
          scale: 1, opacity: 1, rotationY: 0, filter: "blur(0px)",
          duration: 0.6, ease: "back.out(1.2)",
          onComplete: () => { if (videoRef.current) videoRef.current.play(); },
        }
      );
    }
  }, [activeLocalVideo]);

  const handleCloseVideo = () => {
    gsap.to(videoContainerRef.current, {
      scale: 0.9, opacity: 0, filter: "blur(10px)", duration: 0.4,
      onComplete: () => setActiveLocalVideo(null),
    });
  };

  const handleWorkClick = (work, index) => {
    if (isThumbnail) {
      setLightboxIndex(index);
      return;
    }
    if (work.videoFile) {
      setActiveLocalVideo(work.videoFile);
    } else if (work.videoUrl && work.videoUrl !== "#") {
      window.open(work.videoUrl, "_blank");
    }
  };

  if (!service) return null;

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center opacity-0 pointer-events-none transition-all overflow-hidden"
      >
        <PixelParticles
          targetRef={activeLocalVideo ? videoContainerRef : hoveredCardRef}
          isVideoOpen={!!activeLocalVideo}
        />

        <button
          onClick={onClose}
          className="fixed top-6 right-6 text-white/30 hover:text-red-500 hover:rotate-90 transition-all duration-500 z-[120] bg-white/5 p-2 rounded-full border border-white/10"
        >
          <X size={30} />
        </button>

        <div
          ref={contentRef}
          className={`w-full max-w-6xl px-4 py-20 overflow-y-auto max-h-screen opacity-0 transition-all duration-500 ${activeLocalVideo ? "blur-md opacity-20 scale-95 pointer-events-none" : "opacity-100"
            }`}
        >
          {/* Header */}
          <div className="mb-10 border-l-4 border-teal-500 pl-6 space-y-2">
            {/* <span className="text-teal-400 font-mono text-xs tracking-[0.4em] uppercase opacity-70 block">
              {service.title}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">
              {service.arTitle}
            </h2> */}
            <span className="text-teal-400 font-mono text-xs tracking-[0.4em] uppercase opacity-70 block">
              {service.label}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">
              {service.heading}
            </h2>
          </div>

          {/* Grid */}
          <div className={`grid gap-4 ${isThumbnail
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}>
            {service.works.length > 0 ? (
              service.works.map((work, index) =>
                isThumbnail ? (
                  /* ── بطاقة Thumbnail (صورة فقط، بدون أيقونة play) ── */
                  <div
                    key={work.id}
                    onClick={() => handleWorkClick(work, index)}
                    onMouseEnter={(e) => setHoveredCardRef({ current: e.currentTarget })}
                    onMouseLeave={() => setHoveredCardRef(null)}
                    className="group relative aspect-video bg-[#0f0f0f] rounded-lg overflow-hidden cursor-zoom-in border border-white/5 hover:border-teal-500/60 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-teal-500/10"
                  >
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Overlay خفيف بدون أيقونة play */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* عنوان في الأسفل */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <p className="text-white text-[10px] font-bold truncate flex items-center gap-1.5">
                        <span className="w-1 h-3 bg-teal-400 inline-block shrink-0" />
                        {work.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── بطاقة عادية (كما هي بدون تغيير) ── */
                  <div
                    key={work.id}
                    onClick={() => handleWorkClick(work, index)}
                    onMouseEnter={(e) => setHoveredCardRef({ current: e.currentTarget })}
                    onMouseLeave={() => setHoveredCardRef(null)}
                    className="group relative aspect-video bg-[#0f0f0f] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-teal-500/50 transition-all duration-500"
                  >
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play size={20} fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <p className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                        <span className="w-1 h-4 bg-teal-500 inline-block" />
                        {work.title}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <p className="text-white/20 font-mono text-sm tracking-widest uppercase italic">
                  Files loading...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Video player */}
        {activeLocalVideo && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={handleCloseVideo} />
            <div
              ref={videoContainerRef}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-teal-500/30 z-[160]"
            >
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/60 hover:bg-red-600 rounded-full text-white transition-all border border-white/10"
              >
                <X size={20} />
              </button>
              <video
                ref={videoRef}
                controls
                playsInline
                className="w-full h-full object-contain"
                src={activeLocalVideo}
              />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Lightbox — خارج الـ modal div عشان z-index يكون فوقه */}
      {lightboxIndex !== null && isThumbnail && service.works.length > 0 && (
        <ThumbnailLightbox
          images={service.works}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};

export default PortfolioModal;