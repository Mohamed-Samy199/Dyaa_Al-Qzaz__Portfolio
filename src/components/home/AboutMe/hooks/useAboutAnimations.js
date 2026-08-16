import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimations = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textBgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Parallax scroll on background kinetic text
      gsap.to(textBgRef.current, {
        xPercent: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 2. Card fade-in on scroll
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });

      // 3. Mouse tilt effect on card
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const rotateY = (clientX / innerWidth - 0.5) * 10;
        const rotateX = -((clientY / innerHeight) - 0.5) * 10;

        gsap.to(cardRef.current, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          rotationY: 0,
          rotationX: 0,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);
      sectionRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener("mousemove", handleMouseMove);
          sectionRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, cardRef, textBgRef };
};