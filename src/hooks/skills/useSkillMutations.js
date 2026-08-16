import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSkillRequest,
  updateSkillRequest,
  deleteSkillRequest,
} from "../../api/skills.api.js";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkillRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSkillRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkillRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};