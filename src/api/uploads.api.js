import client from "./client";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await client.post("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data.url; // لسه بترجع الـ url بس زي ما هي متوقعة في الفرونت
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    throw err;
  }
};