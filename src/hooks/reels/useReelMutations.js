import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReelRequest,
  updateReelRequest,
  deleteReelRequest,
} from "../../api/reels.api.js";

export const useCreateReel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReelRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reels"] }),
  });
};

export const useUpdateReel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReelRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reels"] }),
  });
};

export const useDeleteReel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReelRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reels"] }),
  });
};