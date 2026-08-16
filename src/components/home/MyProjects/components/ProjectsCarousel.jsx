import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import ProjectCard from "./ProjectCard";
import { SWIPER_CONFIG } from "../constants";

const ProjectsCarousel = ({ projects, onPlay }) => {
  const swiperRef = useRef(null);

  if (!projects.length) return null;

  return (
    <div className="swiper-container relative px-12 md:px-20">
      <button className="custom-prev group absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500 hover:border-transparent transition-all duration-300 hover:scale-110 bg-black/80 backdrop-blur-md shadow-xl">
        <ChevronLeft size={28} className="text-white transition-transform duration-300 group-hover:scale-125" />
      </button>

      <button className="custom-next group absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500 hover:border-transparent transition-all duration-300 hover:scale-110 bg-black/80 backdrop-blur-md shadow-xl">
        <ChevronRight size={28} className="text-white transition-transform duration-300 group-hover:scale-125" />
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => `<span class="${className} custom-bullet"></span>`,
        }}
        className="!pb-16"
        {...SWIPER_CONFIG}
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <ProjectCard project={project} onPlay={onPlay} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsCarousel;