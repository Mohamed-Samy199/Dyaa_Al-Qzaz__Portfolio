import TestimonialCard from "./TestimonialCard";

const ReviewsMarquee = ({ reviews }) => {
  if (!reviews.length) return null;

  const doubledReviews = [...reviews, ...reviews];

  return (
    <div className="flex whitespace-nowrap overflow-hidden">
      <div className="marquee-inner flex gap-8">
        {doubledReviews.map((review, index) => (
          <TestimonialCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsMarquee;