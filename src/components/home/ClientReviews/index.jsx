import { useMarqueeAnimation } from "./hooks/useMarqueeAnimation";

import SectionHeader from "./components/SectionHeader";
import ReviewsMarquee from "./components/ReviewsMarquee";
import BottomDivider from "./components/BottomDivider";
import { useReviews } from "../../../hooks/reviews/useReviews";

const ClientReviews = () => {
  const { data: reviews } = useReviews();
  useMarqueeAnimation(reviews?.length > 0);

  return (
    <section className="bg-[#050505] py-12 overflow-hidden border-t border-white/5">
      <SectionHeader />
      <ReviewsMarquee reviews={reviews || []} />
      <BottomDivider />
    </section>
  );
};

export default ClientReviews;