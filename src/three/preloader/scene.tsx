import { Scene } from "three";

let scene: Scene;

export const createScene = () => {
  scene = new Scene();
  return scene;
};

export const useScene = () => scene;
