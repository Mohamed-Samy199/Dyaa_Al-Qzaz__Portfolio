import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../../api/auth.api.js";
import { authStore } from "../../store/auth.store.js";
import { QUERY_KEYS } from "../../constants/queryKeys.js";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, token }) => {
      authStore.setToken(token);
      queryClient.setQueryData(QUERY_KEYS.AUTH_ME, user);
    },
  });
};