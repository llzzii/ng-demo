import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Plane, Vector3, WebGLRenderer } from "three";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";

@Component({
  selector: "app-demo1",
  templateUrl: "./demo1.component.html",
  styleUrls: ["./demo1.component.css"],
})
export class Demo1Component implements OnInit {
  @ViewChild("canv", { static: true }) canv: ElementRef;

  DAMPING = 0.03;
  DRAG = 1 - this.DAMPING;
  MASS = 0.1;
  restDistance = 25;
  xSegs = 10;
  ySegs = 10;
  clothFunction;
  cloth;
  GRAVITY = 981 * 1.4;
  gravity = new Vector3(0, -this.GRAVITY, 0).multiplyScalar(this.MASS);

  TIMESTEP = 18 / 1000;
  TIMESTEP_SQ = this.TIMESTEP * this.TIMESTEP;

  pins = [];

  windForce = new Vector3(0, 0, 0);

  ballPosition = new Vector3(0, -45, 0);
  ballSize = 60; // 40
  diff = new Vector3();
  tmpForce = new Vector3();
  constructor() {}

  plane(width: number, height: number) {
    return (u, v, target) => {
      const x = (u - 0.5) * width;
      const y = (v + 0.5) * height;
      const z = 0;
      target.set(x, y, z);
    };
  }
  satisfyConstraints(p1, p2, distance) {
    this.diff.subVectors(p2.position, p1.position);
    const currentDist = this.diff.length();
    if (currentDist === 0) { return; } // prevents division by 0
    const correction = this.diff.multiplyScalar(1 - distance / currentDist);
    const correctionHalf = correction.multiplyScalar(0.5);
    p1.position.add(correctionHalf);
    p2.position.sub(correctionHalf);
  }

  load() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.canv.nativeElement.appendChild(renderer.domElement);
  }
  ngOnInit() {
    this.clothFunction = this.plane(
      this.restDistance * this.xSegs,
      this.restDistance * this.ySegs
    );

    this.load();
  }
}
