import { useQuery } from "@tanstack/react-query";
import { getAboutRequest } from "../../api/about.api.js";

export const useAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAboutRequest,
  });
};