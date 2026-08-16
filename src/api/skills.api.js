import client from "./client.js";

export const getSkillsRequest = async () => {
  const { data } = await client.get("/skills");
  return data.data.skills;
};

export const createSkillRequest = async (payload) => {
  const { data } = await client.post("/skills", payload);
  return data.data.skill;
};

export const updateSkillRequest = async ({ id, payload }) => {
  const { data } = await client.patch(`/skills/${id}`, payload);
  return data.data.skill;
};

export const deleteSkillRequest = async (id) => {
  await client.delete(`/skills/${id}`);
  return id;
};