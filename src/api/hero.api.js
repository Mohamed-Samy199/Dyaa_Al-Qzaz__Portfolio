import client from "./client.js";

export const getHeroRequest = async () => {
  const { data } = await client.get("/hero");
  return data.data.hero;
};

export const updateHeroRequest = async (payload) => {
  const { data } = await client.patch("/hero", payload);
  return data.data.hero;
};

