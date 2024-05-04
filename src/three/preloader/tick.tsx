import { useCamera, updateCameraMatrix } from "@/three/preloader/camera";
import { usePreloader, updatePreloader } from "@/three/preloader/preloader";
import { useRenderer, updateRenderer } from "@/three/preloader/renderer";

let anim: number;

export const createTick = () => {
  if (useCamera()) updateCameraMatrix();
  if (useRenderer()) updateRenderer();
  if (usePreloader()) updatePreloader();

  anim = window.requestAnimationFrame(createTick);
};

export const removeTick = () => {
  cancelAnimationFrame(anim);
};
