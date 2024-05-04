import { loadModel, increaseLoadedAssets } from "./loaders";
import { useScene } from "./scene";
import gsap from "gsap";
import { Group, Sprite, SpriteMaterial, TextureLoader, Texture, Scene, Object3D, Mesh } from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface PlaneInt extends Object3D {
  scene: {
    children: PlaneInt[];
  };
  geometry: {
    dispose: () => void;
  };
  material: {
    dispose: () => void;
  };
}

let scene: InstanceType<typeof Scene>;
let group: InstanceType<typeof Group>;
let object: GLTF;
let plane: InstanceType<typeof Object3D>;

const particleCount: number = 50;

let particles: InstanceType<typeof Sprite>[];
let textures: {
  alpha: InstanceType<typeof Texture>;
  base: InstanceType<typeof Texture>;
}[];

export const createPlane = async () => {
  scene = useScene();
  group = new Group();

  object = await loadModel("/models/space.glb");
  plane = object.scene.children[0];

  const scaleFactor = 0.3; // You can adjust this value as needed
  plane.scale.set(scaleFactor, scaleFactor, scaleFactor);

  plane.position.y = 0.6;
  plane.rotation.y = -2.2;

  //
  const tl1 = gsap.timeline({ repeat: -1 });
  tl1.to(plane.rotation, { duration: 0.5, z: 0, ease: "power1.inOut"});
  tl1.to(plane.rotation, { duration: 0.5, z: 0.05, ease: "power1.inOut"});
  tl1.to(plane.rotation, { duration: 0.5, z: 0, ease: "power1.inOut"});

  if (innerWidth > 750) group.position.set(100, 0.5, -0.5);
  else group.position.set(10, 0.5, -0.7);
  group.add(plane);

  createParticles();
};

export const revealPlane = () => {
  gsap.to(group.position, { duration: 1.5,  x: 30, z: innerWidth > 750 ? 3 : 0, ease: "power1.inOut" });
};

export const transitionPlane = () => {
  gsap.to(group.position, { duration: 3, x: 30, z: 7, ease: "power3.inOut" });
  animParticles();
};

export const removePlane = () => {
  if (plane) {
    //@todo - what are these two dispose functions doing and are they needed?
    // plane.material.dispose();
    // plane.geometry.dispose();
    // Does this need to be reworked?
    /*
    const disposeObject : Object3D = scene.getObjectByName('plane');
    disposeObject.material.dispose();
    disposeObject.geometry.dispose();

     */
    scene.remove(plane);
  }

  if (group) scene.remove(group);
};

const createParticles = () => {
  particles = [];
  textures = [];

  const stickers = ["diamond", "dogecoin", "pepe", "whale", "lingo", "moon", "monkey", "penguin"];
  const textureLoader = new TextureLoader();

  stickers.forEach((el) => {
    const base = textureLoader.load(`/textures/stickers/${el}_base.jpg`);
    const alpha = textureLoader.load(`/textures/stickers/${el}_alpha.jpg`);

    textures.push({ base, alpha });
  });

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const randTexture = Math.floor(Math.random() * textures.length);

    const spriteMaterial = new SpriteMaterial({
      map: textures[randTexture].base,
      alphaMap: textures[randTexture].alpha,
      transparent: true,
    });
    const sprite = new Sprite(spriteMaterial);
    sprite.position.set(-3.6, 1.7, -4);
    particles.push(sprite);
    group.add(sprite);
  }

  scene.add(group);
};

const animParticles = () => {
  let animsComplete = 0;

  particles.forEach((el) => {
    const delay = Math.random() * (0.5 - 0 + 1) + 0.2;
    const randX = Math.random() * (-25 - -35 + 1) + -40;
    const randY = Math.random() * (-5 - -15 + 1) + -15;

    gsap.to(el.position, {
      delay,
      duration: 1.5,
      x: randX,
      y: randY,
    });

    gsap.to(el.material, {
      delay,
      duration: 1.5,
      opacity: 0,
      onComplete: () => {
        animsComplete++;

        //
        el.material.dispose();
        el.geometry.dispose();
        scene.remove(el);

        if (animsComplete === particleCount) removeParticleTextures();
      },
    });
  });
};

const removeParticleTextures = () => {
  textures.forEach((el) => {
    el.base.dispose();
    el.alpha.dispose();
  });
};
