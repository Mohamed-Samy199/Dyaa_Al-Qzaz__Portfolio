import { PlayCircle, Layers, Video, Palette, Mic2 } from "lucide-react";

export const SKILL_ICON_OPTIONS = [
  { value: "Layers", label: "Layers", Icon: Layers },
  { value: "PlayCircle", label: "Play Circle", Icon: PlayCircle },
  { value: "Video", label: "Video", Icon: Video },
  { value: "Palette", label: "Palette", Icon: Palette },
  { value: "Mic2", label: "Mic", Icon: Mic2 },
];

export const getSkillIcon = (name) => {
  return SKILL_ICON_OPTIONS.find((opt) => opt.value === name)?.Icon || Layers;
};
