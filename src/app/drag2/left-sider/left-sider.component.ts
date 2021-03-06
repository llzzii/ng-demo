import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { componentList } from "../common/list";

@Component({
  selector: "left-sider",
  templateUrl: "./left-sider.component.html",
  styleUrls: ["./left-sider.component.css"],
})
export class LeftSiderComponent implements OnInit {
  @ViewChild("container", { static: true, read: ViewContainerRef })
  container: ViewContainerRef;
  listData = componentList;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  handleDragStart(e) {
    console.log(e);
  }
  loadComponent() {}
  ngOnInit(): void {
    console.log(this.listData);
    this.loadComponent();
  }
}
