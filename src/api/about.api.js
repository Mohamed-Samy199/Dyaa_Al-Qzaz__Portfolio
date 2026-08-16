import client from "./client.js";

export const getAboutRequest = async () => {
  const { data } = await client.get("/about");
  return data.data.about;
};

export const updateAboutRequest = async (payload) => {
  const { data } = await client.patch("/about", payload);
  return data.data.about;
};
