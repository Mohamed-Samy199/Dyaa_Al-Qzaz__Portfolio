import {
  PlayCircle,
  Layers,
  Video,
  Palette,
  Mic2,
} from "lucide-react";


import v1 from "../../../assets/shared/v1.webp";
import v2 from "../../../assets/shared/v2.webp";
import v3 from "../../../assets/shared/v3.webp";
import v4 from "../../../assets/shared/v4.webp";
import v5 from "../../../assets/shared/v5.webp";
import v6 from "../../../assets/shared/v6.webp";

// ── Thumbnail ──────────────────────
import th1 from "../../../assets/shared/v1.webp";
import th2 from "../../../assets/shared/v2.webp";
import th3 from "../../../assets/shared/v3.webp";
import th4 from "../../../assets/shared/v4.webp";
import th5 from "../../../assets/shared/v5.webp";
import th6 from "../../../assets/shared/v6.webp";
// ─────────────────────────────────────────────────────────────────────

import vib1 from "../../../assets/shared/vid.webm";
import vib2 from "../../../assets/shared/vid2.webm";
import vib3 from "../../../assets/shared/vid3.webm";

/* ─── بيانات الخدمات ─── */
const SERVICES = [
  {
    id: "01",
    title: "MOTION GRAPHICS",
    arTitle: "Motion Graphics",
    Icon: Layers,
    works: [
      {
        id: 1,
        title: "عقارات",
        thumbnail: "https://i3.ytimg.com/vi/Rj0QQM28t7E/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=Rj0QQM28t7E",
      },
      {
        id: 2,
        title: "مصنع ماتش هوم",
        thumbnail: "https://i3.ytimg.com/vi/7u3cyXeDabA/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=7u3cyXeDabA",
      },
    ],
  },
  {
    id: "02",
    title: "VISUAL STORYTELLING",
    arTitle: "Visual Storytelling",
    Icon: PlayCircle,
    works: [
      {
        id: 3,
        title: "The INSANE Reason They FIRED Sam Altman (The $500 Billion Secret)",
        thumbnail: "https://i.ytimg.com/vi/_QOEre-yZsU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBz-DXisGzHT-GMpsurYc_Q44Wbdg",
        videoUrl: "https://www.youtube.com/watch?v=_QOEre-yZsU&t=12s",
      },
      {
        id: 4,
        title: "Elon Musk's SECRET WAR With Sam Altman – The Untold Story That Will Decide AI's Future (2026)",
        thumbnail: "https://i.ytimg.com/vi/84NWCqpc_4U/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLB5L2NlvcHmLaj2TrDhsUaNqi0xAw",
        videoUrl: "https://www.youtube.com/watch?v=84NWCqpc_4U",
      },
    ],
  },
  {
    id: "03",
    title: "VIDEO EDITING",
    arTitle: "Video Editing",
    Icon: Video,
    works: [
      { id: 1, title: "الخطأ القاتل",        thumbnail: v1, videoEditing: vib1 },
      { id: 2, title: "كفاية..",              thumbnail: v2, videoEditing: vib2 },
      { id: 3, title: "AI بيهددك",            thumbnail: v3, videoEditing: vib3 },
      { id: 4, title: "النسويق مش مبيعات",   thumbnail: v4, videoEditing: vib1 },
      { id: 5, title: "اعلانك بيخسر",        thumbnail: v5, videoEditing: vib2 },
      { id: 6, title: "فخ Fomo",              thumbnail: v6, videoEditing: vib3 },
    ],
  },
  {
    id: "04",
    title: "THUMBNAIL DESIGN",
    arTitle: "Thumbnail Design",
    Icon: Palette,
    // ── أضف هنا صور الـ thumbnail بتاعتك ──
    works: [
      { id: 1, title: "Thumbnail 1", thumbnail: th1 },
      { id: 2, title: "Thumbnail 2", thumbnail: th2 },
      { id: 3, title: "Thumbnail 3", thumbnail: th3 },
      { id: 4, title: "Thumbnail 4", thumbnail: th4 },
      { id: 5, title: "Thumbnail 5", thumbnail: th5 },
      { id: 6, title: "Thumbnail 6", thumbnail: th6 },
    ],
  },
  {
    id: "05",
    title: "VOICE OVER",
    arTitle: "Voice Over",
    Icon: Mic2,
    works: [
      {
        id: 1,
        title: "ناجي العلي لا يزال «حنظلة» حيًا",
        thumbnail: "https://img.youtube.com/vi/nldUBw8o2LA/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=nldUBw8o2LA",
      },
      {
        id: 2,
        title: "اعلان غير رسمي لشركة زين - موشن جرافيك",
        thumbnail: "https://img.youtube.com/vi/5gyD0CYt1Xg/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=5gyD0CYt1Xg&t=3s",
      },
      {
        id: 3,
        title: "عينة صوتية || المعلق الصوتي || ضياء القزاز",
        thumbnail: "https://img.youtube.com/vi/5gyD0CYt1Xg/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=_mXMV6PGqHY&t=6s",
      },
    ],
  },
];

export default SERVICES;