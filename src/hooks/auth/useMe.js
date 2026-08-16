import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../../api/auth.api.js";
import { authStore } from "../../store/auth.store.js";
import { QUERY_KEYS } from "../../constants/queryKeys.js";

export const useMe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH_ME,
    queryFn: getMeRequest,
    enabled: authStore.hasToken(),
  });
};