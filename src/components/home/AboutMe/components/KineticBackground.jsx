const KineticBackground = ({ textBgRef }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
      <h2
        ref={textBgRef}
        className="text-[30vw] font-black whitespace-nowrap uppercase leading-none will-change-transform"
      >
        Visual Storyteller • Motion • Design • Editor •
      </h2>
    </div>
  );
};

export default KineticBackground;