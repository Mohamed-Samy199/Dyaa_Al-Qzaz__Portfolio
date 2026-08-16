import { Play, ExternalLink } from "lucide-react";

export default function WorkCard({ work }) {
  const handleClick = () => {
    if (!work.videoUrl || work.videoUrl === "#") return;

    let url = work.videoUrl;

    if (url.includes("/embed/")) {
      const id = url.split("/embed/")[1];
      url = `https://www.youtube.com/watch?v=${id}`;
    }

    window.open(url, "_blank");
  };

  return (
    <div onClick={handleClick} className="work-card group">
      <img src={work.thumbnail} alt={work.title} />

      <div className="overlay">
        <div className="play-btn">
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      <div className="title">
        <p>
          {work.title}
          <ExternalLink size={14} />
        </p>
      </div>
    </div>
  );
}