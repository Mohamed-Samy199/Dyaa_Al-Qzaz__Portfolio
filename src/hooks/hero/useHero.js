import { useQuery } from "@tanstack/react-query";
import { getHeroRequest } from "../../api/hero.api.js";

export const useHero = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: getHeroRequest,
  });
};
