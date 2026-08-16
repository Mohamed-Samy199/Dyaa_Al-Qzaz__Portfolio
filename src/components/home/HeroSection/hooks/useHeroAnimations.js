import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHeroAnimations = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    let ctxGSAP = gsap.context(() => {
      const tl = gsap.timeline();

      // 3D character entrance
      tl.from(".char", {
        y: 100,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
      })
        // Image flip-in
        .from(imageRef.current, {
          scale: 0,
          rotationY: 180,
          rotationX: 45,
          opacity: 0,
          duration: 2,
          ease: "back.out(1.7)",
        }, "-=1")
        .from(".sub-text", { opacity: 0, y: 20, duration: 0.8 }, "-=1")
        .from(".cta-btn", { scale: 0, opacity: 0, stagger: 0.2, ease: "elastic.out(1, 0.5)" }, "-=0.5");

      // Continuous orbit rotation
      gsap.to(".orbit-icon", { rotation: 360, duration: 20, repeat: -1, ease: "none" });

      // Mouse parallax
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(imageRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1.2,
          ease: "power2.out",
        });

        gsap.to(".floating-decor", {
          x: -xPos * 1.5,
          y: -yPos * 1.5,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => {
      ctxGSAP.revert();
      document.body.style.overflow = "auto";
    };
  }, []);

  return { heroRef, imageRef, textRef, orbitRef };
};