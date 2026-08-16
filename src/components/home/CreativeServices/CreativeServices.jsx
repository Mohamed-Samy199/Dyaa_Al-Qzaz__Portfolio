import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PortfolioModal from "./PortfolioModal";
import ServiceCard from "./ServiceCard";
import "./PortfolioModal.css";
import { useSkills } from "../../../hooks/skills/useSkills";

export default function CreativeServices() {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);
  const { data: skills } = useSkills();

  useEffect(() => {
    if (!skills?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(".service-strip", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [skills]);

  return (
    <div className="relative">
      <section
        ref={containerRef}
        className="h-screen min-h-[700px] bg-white flex flex-col md:flex-row overflow-hidden border-y border-gray-200"
      >
        {skills?.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onOpen={(s) => setSelectedService(s)}
          />
        ))}
      </section>

      <PortfolioModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </div>
  );
}