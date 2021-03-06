import { Component, OnInit } from "@angular/core";
import { DragService } from "../drag.service";
import { HtmlList } from "../common/htmlList";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  tags = ["left", "main"];
  htmlList;
  listData = [];
  constructor(private dragService: DragService) {
    this.dragService.getDragData().subscribe((res) => {

      if (res) {
        this.listData[res.index] = res.data;
      }
    });
  }
  dropend(e) {
    console.log(e);
    if (e.tag === "left") {
      this.listData.push(e);
    } else {
      const index = e.el.nativeElement.getAttribute('index');
      this.listData[index].x = e.x;
      this.listData[index].y = e.y;
    }
    this.htmlList = new HtmlList(this.listData[0].data);
  }
  setProp(i, data, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragService.setDragData({ index: i, data });
  }
  ngOnInit(): void {
    console.log(1);
  }
}
