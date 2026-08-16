import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useMarqueeAnimation = (dependency) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (!dependency) return;

    const ctx = gsap.context(() => {
      animationRef.current = gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });

      const cards = document.querySelectorAll(".testimonial-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => animationRef.current?.pause());
        card.addEventListener("mouseleave", () => animationRef.current?.play());
      });
    });

    return () => {
      ctx.revert();
      animationRef.current?.kill();
    };
  }, [dependency]);
};