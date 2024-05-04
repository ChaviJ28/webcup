import { increaseLoadedAssets } from "./loaders";
import { useScene } from "./scene";
import gsap from "gsap";
import { PlaneGeometry, TextureLoader, Texture, MeshBasicMaterial, RepeatWrapping, Mesh, Scene } from "three";

let scene: InstanceType<typeof Scene>;
let geo: InstanceType<typeof PlaneGeometry>;
let base: InstanceType<typeof Texture>;
let alpha: InstanceType<typeof Texture>;
let transition: InstanceType<typeof Texture>;
let mat: InstanceType<typeof MeshBasicMaterial>;
let transitionMat = null;

let mesh1: InstanceType<typeof Mesh>;
let mesh2: InstanceType<typeof Mesh>;
let mesh3: InstanceType<typeof Mesh>;

export const createClouds = async () => {
  scene = useScene();

  geo = new PlaneGeometry(4, 1);
  base = new TextureLoader().load("/textures/clouds_base.jpg", () => increaseLoadedAssets());
  alpha = new TextureLoader().load("/textures/clouds_alpha.jpg", () => increaseLoadedAssets());
  mat = new MeshBasicMaterial({ map: base, alphaMap: alpha, transparent: true, opacity: 0.8 });

  base.wrapS = RepeatWrapping;
  base.repeat.x = 4;
  alpha.wrapS = RepeatWrapping;
  alpha.repeat.x = 4;

  mesh1 = new Mesh(geo, mat);
  mesh2 = new Mesh(geo, mat);

  mesh1.position.set(0, -0.28, 19.45);
  mesh2.position.set(0, -0.2, 19.45);

  //
  gsap.to(mesh1.position, { duration: 10, x: -1, repeat: -1, ease: "none" });
  gsap.to(mesh2.position, { duration: 15, x: -1, repeat: -1, ease: "none" });

  //
  transition = new TextureLoader().load("/textures/clouds_transition.jpg", () => increaseLoadedAssets());
  transition.wrapS = RepeatWrapping;
  transition.repeat.x = 4;
  transitionMat = new MeshBasicMaterial({ color: 0xffffff, alphaMap: transition, transparent: true });

  mesh3 = new Mesh(geo, transitionMat);
  mesh3.position.set(0, -0.5, 19.5);

  //
  scene.add(mesh1, mesh2, mesh3);
};

export const transitionClouds = (root: HTMLDivElement) => {
  gsap.to(mesh3.position, { delay: 1.2, duration: 2, y: 0.1, ease: "power3.inOut" });
  gsap.to(mesh2.position, { delay: 1.2, duration: 2, y: 0.1, ease: "power3.inOut" });
  gsap.to(mesh1.position, {
    delay: 1.3,
    duration: 2,
    y: 0,
    ease: "power3.inOut",
    onComplete: () => {
      removeClouds();
      gsap.to(mesh3.material, { duration: 1, opacity: 0, ease: "power3.inOut" });
      gsap.to(root, { duration: 1, autoAlpha: 0 });
    },
  });
};

export const removeClouds = () => {
  geo.dispose();
  base.dispose();
  alpha.dispose();
  transition.dispose();

  mat.dispose();
  mat.map?.dispose();
  mat.alphaMap?.dispose();

  // transitionMat.dispose();
  // transitionMat.alphaMap.dispose();

  scene.remove(mesh1, mesh2);
};
