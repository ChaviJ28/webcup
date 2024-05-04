import { increaseLoadedAssets } from "./loaders";
import { useScene } from "./scene";
import { Scene } from "three";
import gsap from "gsap";
import { TextureLoader, RepeatWrapping, PlaneGeometry, ShaderMaterial, Mesh, Vector3 } from "three";

import fragmentShader from "../../shaders/preloader/fragment.glsl?raw";
import vertexShader from "../../shaders/preloader/vertex.glsl?raw";

let scene: InstanceType<typeof Scene>;
let mesh: Mesh;
let geo: PlaneGeometry;
let mat: ShaderMaterial;
let spinner: HTMLDivElement;

export const createPreloader = (spinnerVal: HTMLDivElement) => {
  scene = useScene();
  spinner = spinnerVal;

  geo = new PlaneGeometry(2, 1);

  const texture1 = new TextureLoader().load("/textures/clouds1.jpg", () => increaseLoadedAssets());
  texture1.wrapS = RepeatWrapping;
  texture1.wrapT = RepeatWrapping;

  mat = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      influence: { value: 0 },
      brightness: { value: 2 },
      alphaMap: { value: texture1 },
      color: { value: new Vector3(0.2, 0.6, 1.0) },
      time: { value: 0 },
    },
  });
  mesh = new Mesh(geo, mat);
  mesh.name = "preloader";

  mesh.position.z = 19.6;

  scene.add(mesh);
};

export const updatePreloader = () => {
  mat.uniforms.time.value += 0.005;
};

export const hidePreloader = () => {
  gsap.to(mat.uniforms.influence, { duration: 2, value: 1, ease: "none" });
  gsap.to(mat.uniforms.brightness, { duration: 1.5, value: 0, ease: "none" });
  gsap.to(spinner, { duration: 1, opacity: 0 });
};

export const usePreloader = () => {
  if (mesh) return mesh;
};
