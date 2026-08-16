import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from "../../api/videos.api.js";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
  });
};