import { revealPlane } from "./plane";
import { hidePreloader } from "./preloader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three";
const totalAssets = 9;
let loadedAssets = 0;

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/js/libs/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

export const loadModel = (url: string) => {
  return loader.loadAsync(url);
};

export const increaseLoadedAssets = () => {
  loadedAssets++;

  if (totalAssets === loadedAssets) {
    // hidePreloader();
    // revealPlane();
  }
};

export const useLoadedAssets = () => loadedAssets;
