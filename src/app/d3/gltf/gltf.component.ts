import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AmbientLight,
  AnimationMixer,
  Clock,
  Color,
  GridHelper,
  Group,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-gltf',
  templateUrl: './gltf.component.html',
  styleUrls: ['./gltf.component.css'],
})
export class GltfComponent implements OnInit {
  @ViewChild('canvasComponent', { static: true }) canvasContainer: ElementRef;
  renderer: any;
  scene: Scene;
  camera: PerspectiveCamera;
  loader: any;
  constructor() {}

  PerspectiveCamera = {
    fov: 30, // 拍摄距离  视野角值越大，场景中的物体越小
    near: 1, //  最小范围
    far: 1000, //  最大范围
  };

  //  DOM对象

  controls;
  selectedObjects = [];
  group: Group;
  group2: Group;
  thingA;
  thingB;

  mixer;

  activeAction;
  actions;

  x = -20;
  y = 10;
  z = -10;

  tagger;

  composer;

  layerData = [];

  gltf;

  raycaster = new Raycaster();
  mouse: Vector2;
  outlinePass: OutlinePass; // 轮廓线
  outlinePass2: OutlinePass;

  serviceBox;

  outlinePassWarn;
  box;
  door;
  ngOnInit() {
    console.log(this.canvasContainer);
    console.log(this.mouse);

    this.init();
  }

  init() {
    console.log(this.canvasContainer.nativeElement);

    //  渲染器
    this.renderer = new WebGLRenderer({ antialias: true }); //  渲染器(去)
    this.renderer.setSize(
      this.canvasContainer.nativeElement.clientWidth,
      this.canvasContainer.nativeElement.clientHeight
    );
    // this.renderer.setClearColor(0x000000, 1.0);    //  颜色
    this.renderer.shadowMap.enabled = true; // 辅助线
    this.renderer.shadowMapSoft = true; // 柔和阴影
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    //  镜头
    this.camera = new PerspectiveCamera(
      this.PerspectiveCamera.fov,
      this.canvasContainer.nativeElement.clientWidth /
        this.canvasContainer.nativeElement.clientHeight,
      this.PerspectiveCamera.near,
      this.PerspectiveCamera.far
    );
    this.camera.position.set(20, 10, 10);
    this.camera.lookAt(0, 0, 0);

    // 控制镜头
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //  场景
    this.scene = new Scene();
    this.scene.background = new Color(0xcccccc);
    // this.scene.add(new AxesHelper(4));

    //  灯光
    const ambientLight = new AmbientLight(0xffffff, 0.2); // 全局光
    ambientLight.position.set(10, 20, 55); // 灯光
    this.scene.add(ambientLight);

    // 点光源
    const pointLight = new PointLight(0xffffff);
    this.camera.add(pointLight);

    this.scene.add(this.camera);

    //  网格
    const gridHelper = new GridHelper(100, 50);
    this.scene.add(gridHelper);

    // this.importantModel();

    const loader = new GLTFLoader();
    loader.load(
      '../../../assets/models/pg.gltf',
      (gltf) => {
        console.log(gltf);
        gltf.scene.traverse(function(child) {
          //   if (child && child.isMesh) {
          //     child.material.emissive = child.material.color;
          //     child.material.emissiveMap = child.material.map;
          //   }
        });
        this.scene.add(gltf.scene);
        // // 调用动画
        this.mixer = new AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });

        console.log(this.mixer);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    const delta = new Clock();
    //  渲染
    const render = () => {
      requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);

      this.controls.update();

      if (this.mixer) {
        this.mixer.update(delta.getDelta());
      }
    };
    render();
  }
}
