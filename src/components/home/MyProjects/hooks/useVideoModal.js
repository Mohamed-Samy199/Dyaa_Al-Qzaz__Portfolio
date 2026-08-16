import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export const useVideoModal = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const videoModalRef = useRef(null);
  const videoRef      = useRef(null);

  const animateVideoModal = (isOpening) => {
    const tl = gsap.timeline({
      onStart: () => {
        if (isOpening) document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        if (isOpening) {
          videoRef.current?.play().catch(() => {});
        } else {
          setIsVideoOpen(false);
          setSelectedProject(null);
          document.body.style.overflow = "auto";
        }
      },
    });

    if (isOpening) {
      tl.fromTo(
        videoModalRef.current,
        { scale: 0, opacity: 0, rotationY: -180, filter: "blur(20px)" },
        { scale: 1, opacity: 1, rotationY: 0, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.2)" }
      );
    } else {
      tl.to(videoModalRef.current, {
        scale: 0, opacity: 0, rotationY: 180, filter: "blur(20px)",
        duration: 0.6, ease: "power2.in",
      });
    }
  };

  const openVideo = (project) => {
    setSelectedProject(project);
    setIsVideoOpen(true);
    requestAnimationFrame(() => animateVideoModal(true));
  };

  const closeVideo = () => {
    if (videoRef.current) videoRef.current.pause();
    animateVideoModal(false);
  };

  // ESC key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && isVideoOpen && closeVideo();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isVideoOpen]);

  // cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return {
    selectedProject,
    isVideoOpen,
    videoModalRef,
    videoRef,
    openVideo,
    closeVideo,
  };
};