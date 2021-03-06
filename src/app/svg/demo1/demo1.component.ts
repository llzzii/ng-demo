import { Component, OnInit } from "@angular/core";
import { Back, Bounce, Power2, TimelineMax } from "gsap/gsap-core";

@Component({
  selector: "app-demo1",
  templateUrl: "./demo1.component.html",
  styleUrls: ["./demo1.component.css"],
})
export class Demo1Component implements OnInit {
  constructor() {}
  animateHouse() {
    // another timeline
    const tl2 = new TimelineMax();
    // Smoke
    tl2
      .from(
        "#House > path:nth-child(2)",
        1.5,
        {
          scaleX: 0,
          scaleY: 0,
          transformOrigin: "bottom-right",
          ease: Back.easeOut,
        },
        0,
        "houseTimeline"
      )
      .from("#House > circle:nth-child(4)", 1.5, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "bottom-right",
        ease: Back.easeOut,
      })
      .staggerFromTo(
        ["#House > circle:nth-child(4)", "#House > path:nth-child(2)"],
        1,
        { opacity: 1 },
        { opacity: 0 },
        0.3
      )
      .repeat(5);

    const tl = new TimelineMax();
    tl
      // Ground
      .from("#House > rect:nth-child(24)", 1, {
        scaleX: 0,
        transformOrigin: "center",
        ease: Power2.easeOut,
      })
      // House
      .from("#House > polygon", 1, {
        scaleY: 0,
        transformOrigin: "bottom",
        ease: Bounce.easeOut,
      })
      // Roof
      .from("#House > path:nth-child(36)", 1, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "top",
        ease: Bounce.easeOut,
      })
      // Balcony
      .staggerFrom(
        ["#House > path:nth-child(34)", "#House > path:nth-child(32)"],
        0.8,
        {
          scaleY: 0,
          transformOrigin: "bottom",
          ease: Bounce.easeOut,
          stagger: 0.2,
        },
        0,
        "scene1+=0.5"
      )
      // Side house
      .staggerFrom(
        ["#House > path:nth-child(10)", "#House > rect:nth-child(8)"],
        0.8,
        {
          scaleX: 0,
          transformOrigin: "right",
          ease: Bounce.easeOut,
          stagger: 0.2,
        },
        0,
        "scene1+=0.5"
      )
      // Side house
      .staggerFrom(
        ["#House > path:nth-child(14)", "#House > rect:nth-child(12)"],
        0.8,
        {
          scaleX: 0,
          transformOrigin: "left",
          ease: Bounce.easeOut,
          stagger: 0.2,
        },
        0,
        "scene1+=0.5"
      )
      // Windows
      .staggerFrom(
        [
          "#House > path:nth-child(39)",
          "#House > path:nth-child(38)",
          "#House > path:nth-child(17)",
          "#House > path:nth-child(18)",
          "#House > path:nth-child(19)",
          "#House > path:nth-child(20)",
        ],
        0.8,
        {
          scaleX: 0,
          transformOrigin: "top",
          ease: Bounce.easeOut,
          stagger: 0.2,
        }
      )
      // Tree
      .staggerFrom(
        [
          "#House > path:nth-child(28)",
          "#House > path:nth-child(26)",
          "#House > path:nth-child(30)",
        ],
        0.8,
        {
          scaleY: 0,
          transformOrigin: "bottom",
          ease: Power2.easeOut,
          stagger: 0.2,
        }
      )
      // Door & chimney
      .staggerFrom(
        [
          "#House > path:nth-child(21)",
          "#House > path:nth-child(22)",
          "#House > path:nth-child(23)",
          "#House > circle:nth-child(23)",
          "#House > path:nth-child(6)",
        ],
        0.8,
        {
          scaleY: 0,
          transformOrigin: "bottom",
          ease: Power2.easeOut,
          stagger: 0.2,
        }
      )
      .add("houseTimeline", "+=0.5");

    tl.add(tl2);
  }

  ngOnInit(): void {}
}
