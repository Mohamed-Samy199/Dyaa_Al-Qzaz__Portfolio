import { useQuery } from "@tanstack/react-query";
import { getSkillsRequest } from "../../api/skills.api.js";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkillsRequest,
  });
};
