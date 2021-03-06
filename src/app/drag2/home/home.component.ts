import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @ViewChild("layout", { static: true }) layout: ElementRef;
  width = "1200px";
  height = "500px";
  constructor() {}

  ngOnInit(): void {
    this.width = window.innerWidth + "px";
    this.height = window.innerHeight + "px";
    console.log(2);
  }
}
