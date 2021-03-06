import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Power4 } from "gsap";
import { Draggable, MotionPathPlugin, TimelineMax, gsap } from "gsap/all";

@Component({
  selector: "app-demo2",
  templateUrl: "./demo2.component.html",
  styleUrls: ["./demo2.component.css"],
})
export class Demo2Component implements OnInit {
  @ViewChild("car1", { static: true }) car1: ElementRef;
  @ViewChild("car2", { static: true }) car2: ElementRef;
  @ViewChild("car3", { static: true }) car3: ElementRef;
  @ViewChild("car4", { static: true }) car4: ElementRef;
  @ViewChild("car5", { static: true }) car5: ElementRef;
  @ViewChild("car6", { static: true }) car6: ElementRef;
  tween;
  tween2;
  tween3;
  width;
  height;
  timelineMax = new TimelineMax();
  timelineMax2 = new TimelineMax();
  timelineMax3 = new TimelineMax();
  constructor() {}
  run(action) {
    // gsap.to(this.car.nativeElement, {
    //   duration: 2,
    //   x: "600px",
    // });

    switch (action) {
      case "play":
        this.tween.play();
        break;
      case "pause":
        this.tween.pause();
        break;
      case "resume":
        this.tween.resume();
        break;
      case "restart":
        this.tween.restart();
        break;
      default:
        break;
    }
  }
  from() {
    // this.tween = gsap.from(this.car.nativeElement, {
    //   duration: 2,
    //   x: "600px",
    //   transformOrigin: "10px bottom",
    //   ease: Power4.easeInOut,
    // });
    this.tween = this.timelineMax
      .set(this.car1.nativeElement, { opacity: 1 })
      .fromTo(
        this.car1.nativeElement,
        { x: "130px" },
        {
          duration: 4,
          x: window.innerWidth - 430 + "px",
        }
      )
      .set(this.car1.nativeElement, { opacity: 0 })
      .set(this.car3.nativeElement, { opacity: 1 })
      .fromTo(
        this.car3.nativeElement,
        { y: "0px" },
        {
          duration: 2,
          y: window.innerHeight - 430 + "px",
        }
      )
      .set(this.car3.nativeElement, { opacity: 0 })
      .set(this.car4.nativeElement, { opacity: 1 })
      .fromTo(
        this.car4.nativeElement,
        { x: "-130px" },
        {
          duration: 4,
          x: 430 - window.innerWidth + "px",
        }
      )
      .set(this.car4.nativeElement, { opacity: 0 })
      .set(this.car2.nativeElement, { opacity: 1 })
      .fromTo(
        this.car2.nativeElement,
        { y: "0px" },
        {
          duration: 2,
          y: 430 - window.innerHeight + "px",
        }
      )
      .set(this.car2.nativeElement, { opacity: 0 });
    // this.twoTween();
  }
  twoTween() {
    this.tween2 = this.timelineMax2
      .fromTo(
        this.car5.nativeElement,
        { x: "0" },
        {
          duration: 4,
          x: window.innerWidth - 600 + "px",
        }
      )
      .to(this.car5.nativeElement, 1, {
        rotation: 90,
        x: window.innerWidth - 600 + "px",
        y: 0,
      })
      .to(this.car5.nativeElement, 1, {
        duration: 2,
        y: window.innerHeight - 610 + "px",
      })
      .to(this.car5.nativeElement, 1, {
        rotation: 180,
        y: window.innerHeight - 610 + "px",
        x: window.innerWidth - 600 + "px",
      })
      .to(this.car5.nativeElement, 1, {
        duration: 4,
        x: 0,
      })
      .to(this.car5.nativeElement, 1, {
        rotation: 270,
        x: -25,
        y: window.innerHeight - 610 + "px",
      })
      .to(this.car5.nativeElement, 1, {
        duration: 2,
        y: 20,
      })
      .to(this.car5.nativeElement, 1, {
        rotation: 0,
        y: 0,
        x: 0,
      });
  }
  threeTween() {
    this.tween3 = this.timelineMax3
      .fromTo(
        this.car6.nativeElement,
        { x: "0" },
        {
          duration: 4,
          x: window.innerWidth - 220 + "px",
        }
      )
      .to(this.car6.nativeElement, 1, {
        rotation: 90,
        x: window.innerWidth - 220 + "px",
        y: 0,
      })
      .to(this.car6.nativeElement, 1, {
        duration: 2,
        y: window.innerHeight - 260 + "px",
      })
      .to(this.car6.nativeElement, 1, {
        rotation: 180,
        y: window.innerHeight - 260 + "px",
        x: window.innerWidth - 220 + "px",
      })
      .to(this.car6.nativeElement, 1, {
        duration: 4,
        x: -40,
      })
      .to(this.car6.nativeElement, 1, {
        rotation: 270,
        x: -60,
        y: window.innerHeight - 260 + "px",
      })
      .to(this.car6.nativeElement, 1, {
        duration: 2,
        y: 20,
      })
      .to(this.car6.nativeElement, 1, {
        rotation: 0,
        y: 0,
        x: 0,
      });
  }
  tss() {
    this.from();
    this.twoTween();
    this.threeTween();
  }
  ngOnInit(): void {
    this.width = window.innerWidth + "px";
    this.height = window.innerHeight + "px";
  }
}
