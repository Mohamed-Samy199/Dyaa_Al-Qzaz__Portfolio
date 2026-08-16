import client from "./client.js";

export const loginRequest = async ({ email, password }) => {
  const { data } = await client.post("/auth/login", { email, password });
  return data.data; // { user, token }
};

export const logoutRequest = async () => {
  const { data } = await client.post("/auth/logout");
  return data;
};

export const getMeRequest = async () => {
  const { data } = await client.get("/auth/me");
  return data.data.user;
};

export const changePasswordRequest = async (payload) => {
  const { data } = await client.patch("/auth/change-password", payload);
  return data.data.user;
};