import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

export default class Boar extends THREE.Mesh {
  constructor(geometry) {
    // Adjust Geometry.
    geometry.translate(-0.5, -0.5, 0);
    geometry.scale(10, 10, 10);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: require('./glsl/boar.vs'),
      fragmentShader: require('./glsl/boar.fs'),
      wireframe: true,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Boar';
  }
  render(time) {
    this.material.uniforms.time.value += time;
  }
}
