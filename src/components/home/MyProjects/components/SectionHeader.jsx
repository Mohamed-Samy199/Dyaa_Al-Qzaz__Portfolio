const SectionHeader = () => (
  <div className="section-header flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
    <div>
      <span className="text-teal-500 font-mono tracking-[0.3em] uppercase text-sm mb-4 block">
        Selected Works
      </span>
      <h2 className="text-4xl md:text-6xl font-black">
        Latest <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-500 to-blue-500">
          Projects.
        </span>
      </h2>
    </div>
    <div className="max-w-md text-gray-400 leading-relaxed border-l-2 border-teal-500/30 pl-6">
      A curation of visual stories where motion meets design to create unforgettable experiences.
      Each project represents a unique challenge solved through creativity.
    </div>
  </div>
);

export default SectionHeader;