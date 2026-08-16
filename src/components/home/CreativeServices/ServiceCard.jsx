import { memo } from "react";
import { getSkillIcon } from "../../../constants/skillIcons";

const ServiceCard = memo(({ service, onOpen }) => {
  const { order, label, heading, icon } = service;
  const Icon = getSkillIcon(icon);

  return (
    <div
      onClick={() => onOpen(service)}
      className="service-strip group relative flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-gray-100 hover:flex-[3] transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden bg-white will-change-[flex]"
    >
      <span className="absolute top-10 text-gray-100 text-8xl font-black transition-colors duration-500 group-hover:text-teal-50/50 select-none">
        {String(order).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="text-teal-600 md:mb-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg]">
          <Icon size={48} strokeWidth={1.2} />
        </div>

        <h3 className="text-xl md:text-3xl font-black text-gray-900 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 uppercase tracking-tighter">
          {heading}
        </h3>

        <button className="mt-6 px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 hover:bg-teal-600">
          Viewing Works
        </button>
      </div>

      <div
        className="hidden md:block absolute bottom-20 rotate-180 [writing-mode:vertical-lr] text-gray-400 font-bold tracking-widest uppercase transition-opacity duration-300 select-none pointer-events-none group-hover:opacity-0"
        aria-hidden="true"
      >
        {label}
      </div>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-teal-400 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
      <div className="absolute inset-0 bg-teal-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
});

export default ServiceCard;