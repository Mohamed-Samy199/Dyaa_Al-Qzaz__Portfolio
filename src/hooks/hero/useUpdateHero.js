import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHeroRequest } from "../../api/hero.api.js";

export const useUpdateHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHeroRequest,
    onSuccess: (hero) => {
      queryClient.setQueryData(["hero"], hero);
    },
  });
};