import { Zap, Film, Palette, Video, Mic, PenTool, Camera, Sparkles } from "lucide-react";

export const ICON_OPTIONS = [
  { value: "Zap", label: "Zap", Icon: Zap },
  { value: "Film", label: "Film", Icon: Film },
  { value: "Palette", label: "Palette", Icon: Palette },
  { value: "Video", label: "Video", Icon: Video },
  { value: "Mic", label: "Mic", Icon: Mic },
  { value: "PenTool", label: "Pen Tool", Icon: PenTool },
  { value: "Camera", label: "Camera", Icon: Camera },
  { value: "Sparkles", label: "Sparkles", Icon: Sparkles },
];

export const getIconComponent = (name) => {
  return ICON_OPTIONS.find((opt) => opt.value === name)?.Icon || Zap;
};