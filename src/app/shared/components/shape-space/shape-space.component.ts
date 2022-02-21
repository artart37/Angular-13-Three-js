import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, WebGLRenderer } from 'three';
import { BoxResponse } from './interfaces/shapes-interfaces';

@Component({
  selector: 'app-shape-space',
  templateUrl: './shape-space.component.html',
  styleUrls: ['./shape-space.component.css'],
})
export class ShapeSpaceComponent implements OnInit, OnChanges {
  //Referencing the cnavas element and the container
  @ViewChild('canvasSection', { static: true })
  canvasSection!: ElementRef<HTMLElement>;
  @ViewChild('canvas', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  @Input() selectedBox!: BoxResponse | null;

  //Setting up the properties for dimenions
  public width: number = 0;
  public height: number = 0;
  private aspect: number = 0;

  //Listening to the resize event to recalculate the canvas dimensions
  //update the camer
  @HostListener('window:resize', []) updateCanvas() {
    this.getDimensions();
    this.updateCamera();
    this.renderer.setSize(this.width, this.height);
  }

  //Setting up the properties for the canvas
  private readonly scene = new THREE.Scene();
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;

  //Setting up the properties for boxes
  private geometry!: BoxGeometry;
  private material!: MeshBasicMaterial;
  private box!: Mesh;

  get getWidth(): number {
    return this.canvasSection.nativeElement.clientWidth;
  }

  get getHeight(): number {
    return this.canvasSection.nativeElement.clientHeight;
  }

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initShape();
      this.animate();
    });
  }

  private initShape() {
    this.initCanvas();
    this.initBoxes();
    this.initCameraPosition();
    this.updateCamera();
  }

  private initCameraPosition() {
    this.camera.position.set(0, 0, 5);
  }

  private initBoxes() {
    this.geometry = new THREE.BoxGeometry(
      this.selectedBox?.x,
      this.selectedBox?.y,
      this.selectedBox?.z
    );
    this.material = new THREE.MeshBasicMaterial({ color: 0x4d138c });
    this.box = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.box);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  private getDimensions() {
    this.width = this.getWidth;
    this.height = this.aspect !== 0 ? this.width / this.aspect : this.getHeight;
  }

  private initCanvas(): void {
    this.getDimensions();
    this.setupCameraAndRenderer();
    this.setupScene();
    this.renderer.setSize(this.width, this.height);
  }

  private setupScene() {
    this.scene.background = new THREE.Color(0xe3e3e3);
  }

  private setupCameraAndRenderer() {
    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement.nativeElement,
    });
  }

  private updateCamera(): void {
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.renderer && changes?.selectedBox) {
      if (this.box) this.scene.remove(this.box);
      this.initShape();
      this.updateCanvas();
    }
  }
}
