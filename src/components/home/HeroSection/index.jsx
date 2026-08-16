import { useVideoModal } from "./hooks/useVideoModal";
import { useParticleCanvas } from "./hooks/useParticleCanvas";
import { useHeroAnimations } from "./hooks/useHeroAnimations";

import HeroText from "./components/HeroText";
import HeroImage from "./components/HeroImage";
import VideoModal from "./components/VideoModal";
import SkillsMarquee from "./components/SkillsMarquee";
import "./HeroPortfolio.css";
import { useHero } from "../../../hooks/hero/useHero";

const HeroPortfolio = () => {
  const { data: hero } = useHero();

  const { heroRef, imageRef, textRef, orbitRef } = useHeroAnimations();

  const {
    isVideoOpen,
    videoModalRef,
    videoRef,
    openVideo,
    closeVideo,
    downloadCV,
  } = useVideoModal({ cvUrl: hero?.cvUrl });

  const { canvasRef } = useParticleCanvas({ isVideoOpen, imageRef, videoModalRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center overflow-hidden py-20 px-6 md:px-12"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[10000]" />

      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">
        <HeroText
          textRef={textRef}
          badgeText={hero?.badgeText}
          description={hero?.description}
          onDownloadCV={downloadCV}
          onOpenVideo={openVideo}
        />
        <HeroImage
          imageRef={imageRef}
          orbitRef={orbitRef}
          heroImage={hero?.heroImage}
          isAvailable={hero?.isAvailable}
        />
      </div>

      <SkillsMarquee />

      {isVideoOpen && (
        <VideoModal
          videoModalRef={videoModalRef}
          videoRef={videoRef}
          onClose={closeVideo}
          showreelVideoUrl={hero?.showreelVideoUrl}
        />
      )}
    </section>
  );
};

export default HeroPortfolio;