import { useQuery } from "@tanstack/react-query";
import { getReviewsRequest } from "../../api/reviews.api.js";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviewsRequest,
  });
};