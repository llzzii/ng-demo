import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import calculateComponentPositonAndSize from "../../common/utils/calculateComponentPositonAndSize";
import { mod360 } from "../../common/utils/translate";
import { DragService } from "../../drag.service";
import { BoundStylePipe } from "../bound-style.pipe";

@Component({
  selector: "com-container",
  template: `
    <ng-container *ngIf="isActive">
      <div
        class="shape-point"
        appShapeDrag
        draggable="true"
        *ngFor="let item of pointList"
        [item]="item"
        [cursors]="cursors"
        [config]="config"
        [ngStyle]="item | boundStyle: config.data:cursors"
      ></div>
    </ng-container>
    <ng-container #container></ng-container>
  `,
  styles: [
    `
      .shape-point {
        position: absolute;
        background: #fff;
        border: 1px solid #59c7f9;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        z-index: 1;
      }
    `,
  ],
})
export class ComContainerComponent implements OnInit {
  @Input() title;
  @Input() index;
  @Input() config: { index: any; data: any };
  @Input() isActive = false;
  @ViewChild("container", { static: true, read: ViewContainerRef })
  container: ViewContainerRef;
  componentRef: ComponentRef<any>;
  pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向
  initialAngle = {
    // 每个点对应的初始角度
    lt: 0,
    t: 45,
    rt: 90,
    r: 135,
    rb: 180,
    b: 225,
    lb: 270,
    l: 315,
  };
  angleToCursor = [
    // 每个范围的角度对应的光标
    { start: 338, end: 23, cursor: "nw" },
    { start: 23, end: 68, cursor: "n" },
    { start: 68, end: 113, cursor: "ne" },
    { start: 113, end: 158, cursor: "e" },
    { start: 158, end: 203, cursor: "se" },
    { start: 203, end: 248, cursor: "s" },
    { start: 248, end: 293, cursor: "sw" },
    { start: 293, end: 338, cursor: "w" },
  ];
  cursors = {};
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dragService: DragService,
    private boundStylePipe: BoundStylePipe
  ) {}
  loadComponent() {
    console.log(this.config, 69);
    if (!this.config) {
      return;
    }
    let conf = this.config.data;
    if (this.config.data.width && this.config.data.x) {
      conf = this.config.data.data;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      conf.component
    );
    this.container.clear();
    this.componentRef = this.container.createComponent(componentFactory);
    this.componentRef.instance["config"] = conf;
  }
  handleMouseDownOnPoint(point, e) {
    e.stopPropagation();
    e.preventDefault();

    const style = { ...this.config.data };

    // 组件宽高比
    const proportion = style.width / style.height;

    // 组件中心点
    const center = {
      x: style.x + style.width / 2,
      y: style.y + style.height / 2,
    };

    // 获取画布位移信息
    // const editorRectInfo = this.editor.getBoundingClientRect();
    const editorRectInfo: any = { left: 220, top: 84 };
    // 当前点击坐标
    const curPoint = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    };

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    };

    // 是否需要保存快照
    let needSave = false;
    let isFirst = true;

    // const needLockProportion = this.isNeedLockProportion();
    const move = (moveEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false;
        return;
      }

      needSave = true;
      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top,
      };
      console.log(
        point,
        style,
        curPositon,
        proportion,
        center,
        curPoint,
        symmetricPoint,
        1234
      );
      let result = calculateComponentPositonAndSize(
        point,
        style,
        curPositon,
        proportion,
        false,
        {
          center,
          curPoint,
          symmetricPoint,
        }
      );
      this.config.data = Object.assign(this.config.data, result);
      let newStyle: any = this.boundStylePipe.transform(
        point,
        this.config.data,
        this.cursors
      );
      //   moveEvent.target.style = Object.assign(moveEvent.target.style, newStyle);
      moveEvent.target.style.marginLeft = newStyle.marginLeft;
      moveEvent.target.style.marginTop = newStyle.marginTop;
      moveEvent.target.style.left = newStyle.left;
      moveEvent.target.style.top = newStyle.top;
      moveEvent.target.style.cursor = newStyle.cursor;

      //   this.componentRef.instance["config"] = this.config.data;
      //   this.dragService.setDragData(this.config);
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }
  getCursor() {
    const { angleToCursor, initialAngle, pointList } = this;
    const rotate = mod360(this.config.data.rotate || 0); // 取余 360
    const result = {};
    let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    pointList.forEach((point) => {
      const angle = mod360(initialAngle[point] + rotate);
      const len = angleToCursor.length;
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len;
        const angleLimit = angleToCursor[lastMatchIndex];
        if (angle < 23 || angle >= 338) {
          result[point] = "nw-resize";

          return;
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = angleLimit.cursor + "-resize";

          return;
        }
      }
    });

    return result;
  }
  ngOnInit(): void {
    this.cursors = this.getCursor();
    console.log(this.cursors);
    this.loadComponent();
  }
}
