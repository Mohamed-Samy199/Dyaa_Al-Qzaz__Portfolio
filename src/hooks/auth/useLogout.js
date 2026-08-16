import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../../api/auth.api.js";
import { authStore } from "../../store/auth.store.js";
import { QUERY_KEYS } from "../../constants/queryKeys.js";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      authStore.clearToken();
      queryClient.setQueryData(QUERY_KEYS.AUTH_ME, null);
      queryClient.clear();
    },
  });
};