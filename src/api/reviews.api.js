import client from "./client.js";

export const getReviewsRequest = async () => {
  const { data } = await client.get("/reviews");
  return data.data.reviews;
};

export const createReviewRequest = async (payload) => {
  const { data } = await client.post("/reviews", payload);
  return data.data.review;
};

export const updateReviewRequest = async ({ id, payload }) => {
  const { data } = await client.patch(`/reviews/${id}`, payload);
  return data.data.review;
};

export const deleteReviewRequest = async (id) => {
  await client.delete(`/reviews/${id}`);
  return id;
};