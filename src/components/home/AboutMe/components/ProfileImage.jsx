import defaultImage from "../../../../assets/logo/dyaaqzaz.webp";

const ProfileImage = ({ imageUrl }) => {
  return (
    <div className="lg:col-span-4 relative group perspective-1000">
      <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

      <img
        src={imageUrl || defaultImage}
        alt="Dyaa Al-Qzaz"
        className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-cover rounded-full mx-auto border-2 border-white/10 group-hover:border-purple-500/50 transition-colors duration-500 shadow-2xl shadow-teal-500/10 group-hover:scale-105 transition-transform"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-white/5 rounded-full group-hover:rotate-90 transition-transform duration-1000" />
    </div>
  );
};

export default ProfileImage;