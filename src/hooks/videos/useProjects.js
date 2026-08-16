import { useQuery } from "@tanstack/react-query";
import { getProjectsRequest } from "../../api/videos.api.js";

export const useProjects = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getProjectsRequest,
  });
};