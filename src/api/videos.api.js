import client from "./client.js";

export const getProjectsRequest = async () => {
  const { data } = await client.get("/videos");
  return data.data.projects;
};

export const createProjectRequest = async (payload) => {
  const { data } = await client.post("/videos", payload);
  return data.data.project;
};

export const updateProjectRequest = async ({ id, payload }) => {
  const { data } = await client.patch(`/videos/${id}`, payload);
  return data.data.project;
};

export const deleteProjectRequest = async (id) => {
  await client.delete(`/videos/${id}`);
  return id;
};