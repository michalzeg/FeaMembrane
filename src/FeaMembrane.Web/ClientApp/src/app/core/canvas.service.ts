import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as  OrbitControlsImport from "../libs/orbitControls";
import { ScaleService } from './scale.service';
import { TextPosition } from '../shared/text-position';
import { TextService } from './text.service';
const OrbitControls = OrbitControlsImport(THREE);
const backgroundColor = 0xffffff;

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private controls!: any;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.Renderer;
  private initialized!: boolean;
  private objects: THREE.Object3D[] = [];

  constructor(private readonly scaleService: ScaleService, private readonly textService: TextService) { }

  initialize(canvas: HTMLElement) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(backgroundColor);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    canvas.appendChild(this.renderer.domElement);
    this.camera.position.z = 100;

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(1000, 1000, 1000);
    this.scene.add(directionalLight2);


    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scaleService.initialize(width, height);
    this.textService.initialize(canvas, this.camera, this.controls);
    this.initialized = true;
    const animate = () => {

      requestAnimationFrame(animate);

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.textService.update();
    };

    animate();
  }

  addTexts(texts: TextPosition[]) {
    this.textService.addTexts(texts);
  }

  addObjects(meshes: THREE.Object3D[]) {
    this.objects = this.objects.concat(meshes);
    meshes.filter(e => e).forEach(mesh => {
      this.scene.add(mesh);
    });
    this.updatePosition();
  }

  clear() {
    this.objects.forEach(mesh => {
      this.scene.remove(mesh);
    });

    this.textService.clean();
  }

  isInitialized() {
    return this.initialized;
  }

  private updatePosition() {
    this.scene.position.x = 0;
    this.scene.position.y = 0;
    this.scene.position.z = 0;
    const translation = this.scaleService.getCentreTranslation();
    this.scene.translateX(-translation.x);
    this.scene.translateY(-translation.y);
    this.camera.position.z = this.scaleService.getCameraZ();
  }
}
