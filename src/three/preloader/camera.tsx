import { useScene } from "./scene";
import { PerspectiveCamera } from "three";

let camera: InstanceType<typeof PerspectiveCamera>;
// let offset = null;
// let zoom = null;
// let cameraRotating = false;

export const createCamera = () => {
  const scene = useScene();
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;

  // settings
  camera = new PerspectiveCamera(45, width / height, 0.1, 500);
  camera.position.set(0, 0, 20);
  updateCameraMatrix();

  // add to scene
  scene.add(camera);
};

export const updateCameraMatrix = () => {
  camera.updateProjectionMatrix();
};

export const resizeCamera = (width: number, height: number) => {
  camera.aspect = width / height;
  updateCameraMatrix();
};

export const useCamera = () => camera;
