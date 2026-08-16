import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReviewRequest,
  updateReviewRequest,
  deleteReviewRequest,
} from "../../api/reviews.api.js";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReviewRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReviewRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReviewRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
};