import { useAboutAnimations } from "./hooks/useAboutAnimations";
import KineticBackground from "./components/KineticBackground";
import ScrollIndicator from "./components/ScrollIndicator";
import ProfileImage from "./components/ProfileImage";
import ManifestoCard from "./components/ManifestoCard";
import { useAbout } from "../../../hooks/about/useAbout";
import { useHero } from "../../../hooks/hero/useHero";

const AboutMe = () => {
  const { sectionRef, cardRef, textBgRef } = useAboutAnimations();
  const { data: about } = useAbout();
  const { data: hero } = useHero(); // نفس صورة الـ Hero

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden py-24 px-6 md:px-12"
    >
      <KineticBackground textBgRef={textBgRef} />
      <ScrollIndicator />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <ProfileImage imageUrl={hero?.heroImage} />
          <ManifestoCard cardRef={cardRef} about={about} />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;