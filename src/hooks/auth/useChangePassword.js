import { useMutation } from "@tanstack/react-query";
import { changePasswordRequest } from "../../api/auth.api.js";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordRequest,
  });
};