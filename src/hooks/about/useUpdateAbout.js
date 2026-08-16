import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAboutRequest } from "../../api/about.api.js";

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAboutRequest,
    onSuccess: (about) => {
      queryClient.setQueryData(["about"], about);
    },
  });
};