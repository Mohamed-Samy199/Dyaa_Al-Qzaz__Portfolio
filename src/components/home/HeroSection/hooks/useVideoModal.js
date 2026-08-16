import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const useVideoModal = ({ cvUrl } = {}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoModalRef = useRef(null);
  const videoRef = useRef(null);

  const animateVideoModal = (isOpening) => {
    const tl = gsap.timeline({
      onStart: () => {
        if (isOpening) document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        if (isOpening) {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
          }
        } else {
          setIsVideoOpen(false);
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

  const openVideo = () => {
    setIsVideoOpen(true);
    requestAnimationFrame(() => animateVideoModal(true));
  };

  const closeVideo = () => {
    if (videoRef.current) videoRef.current.pause();
    animateVideoModal(false);
  };

  const downloadCV = () => {
    if (!cvUrl) return;
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Dyaa_Al-Qzaz_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    gsap.to(".download-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isVideoOpen) closeVideo();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isVideoOpen]);

  return { isVideoOpen, videoModalRef, videoRef, openVideo, closeVideo, downloadCV };
};