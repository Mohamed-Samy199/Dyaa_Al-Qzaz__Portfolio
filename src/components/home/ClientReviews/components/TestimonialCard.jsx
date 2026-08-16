import { Star } from "lucide-react";

const VerifiedIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const TestimonialCard = ({ review }) => (
  <div className="testimonial-card relative w-[450px] md:w-[700px] bg-[#ffffff] border border-white/10 backdrop-blur-xl group hover:border-purple-500/50 transition-all duration-500 overflow-hidden rounded-2xl cursor-pointer">

    {/* Full-width image */}
    <div className="relative w-full">
      <img
        src={review.image}
        alt={review.alt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>

    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Platform badge */}
    <div className="absolute top-4 right-4 px-4 py-2 bg-purple-600/40 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg z-10">
      {review.platform}
    </div>

    {/* Star rating */}
    <div className="absolute top-4 left-4 flex gap-1 z-10">
      {Array.from({ length: review.rating }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-500 fill-yellow-500 drop-shadow-lg" />
      ))}
    </div>

    {/* Verified badge */}
    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-green-600/90 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-lg z-10">
      <VerifiedIcon />
      موثق
    </div>

    {/* Corner decorations */}
    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/20 group-hover:border-purple-500 transition-colors duration-500 rounded-tr-2xl" />
    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/20 group-hover:border-purple-500 transition-colors duration-500 rounded-bl-2xl" />
  </div>
);

export default TestimonialCard;