import { useScene } from "./scene";
import { AmbientLight, DirectionalLight } from "three";

export const createLights = () => {
  const scene = useScene();
  const aLight = new AmbientLight(0xffffff, 2);
  scene.add(aLight);

  const directionalLight = new DirectionalLight(0xffffff, 2);
  scene.add(directionalLight);
};
