import * as THREE from 'three';

import PromiseTextureLoader from '../../common/PromiseTextureLoader';
import Camera from './Camera';
import ImageGroup from './ImageGroup';

// ==========
// Define common variables
//
let renderer;
const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock({
  autoStart: false
});

// ==========
// Define unique variables
//
const imageGroup = new ImageGroup();

// ==========
// Define WebGLContent Class.
//
export default class WebGLContent {
  constructor() {
  }
  async start(canvas) {
    renderer = new THREE.WebGL1Renderer({
      alpha: true,
      antialias: true,
      canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0e0e0e, 1.0);

    await Promise.all([
      PromiseTextureLoader('/sketch-threejs/img/sketch/burn/noise.png'),
      PromiseTextureLoader('/sketch-threejs/img/sketch/burn/image01.jpg'),
      PromiseTextureLoader('/sketch-threejs/img/sketch/burn/image02.jpg'),
      PromiseTextureLoader('/sketch-threejs/img/sketch/burn/image03.jpg'),
    ]).then((response) => {
      const noiseTex = response[0];
      const imgTexes = response.slice(1);

      noiseTex.wrapS = THREE.RepeatWrapping;
      noiseTex.wrapT = THREE.RepeatWrapping;

      imageGroup.start(noiseTex, imgTexes);

      scene.add(imageGroup);
    });

    camera.start();
  }
  play() {
    clock.start();
    this.update();
  }
  pause() {
    clock.stop();
  }
  update() {
    // When the clock is stopped, it stops the all rendering too.
    if (clock.running === false) return;

    // Calculate msec for this frame.
    const time = clock.getDelta();

    // Update Camera.
    camera.update(time);

    // Update each objects.
    imageGroup.update(time);

    // Render the 3D scene.
    renderer.render(scene, camera);
  }
  resize(resolution) {
    camera.resize(resolution);
    renderer.setSize(resolution.x, resolution.y);
    imageGroup.resize(camera, resolution);
  }
}
