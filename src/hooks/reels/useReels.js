import { useQuery } from "@tanstack/react-query";
import { getReelsRequest } from "../../api/reels.api.js";

export const useReels = () => {
  return useQuery({
    queryKey: ["reels"],
    queryFn: getReelsRequest,
  });
};