import { useCamera } from "@/three/preloader/camera";
import { useScene } from "@/three/preloader/scene";
import { WebGLRenderer, SRGBColorSpace } from "three";

let width: number;
let height: number;
let renderer: WebGLRenderer;

export const createRenderer = (canvas: HTMLCanvasElement) => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
};

export const resizeRenderer = (width: number, height: number) => {
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export const updateRenderer = () => {
  const scene = useScene();
  const camera = useCamera();
  renderer.render(scene, camera);
};

export const removeRenderer = () => {
  renderer.dispose();
};

export const useRenderer = () => renderer;
