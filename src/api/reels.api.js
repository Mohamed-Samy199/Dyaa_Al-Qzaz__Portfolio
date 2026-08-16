import client from "./client.js";

export const getReelsRequest = async () => {
  const { data } = await client.get("/reels");
  return data.data.reels;
};

export const createReelRequest = async (payload) => {
  const { data } = await client.post("/reels", payload);
  return data.data.reel;
};

export const updateReelRequest = async ({ id, payload }) => {
  const { data } = await client.patch(`/reels/${id}`, payload);
  return data.data.reel;
};

export const deleteReelRequest = async (id) => {
  await client.delete(`/reels/${id}`);
  return id;
};