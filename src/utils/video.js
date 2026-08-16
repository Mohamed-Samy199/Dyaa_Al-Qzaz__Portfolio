export const openYouTube = (url) => {
  if (!url || url === "#") return;

  let finalUrl = url;

  if (url.includes("/embed/")) {
    const id = url.split("/embed/")[1];
    finalUrl = `https://www.youtube.com/watch?v=${id}`;
  }

  window.open(finalUrl, "_blank");
};