import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from "@angular/core";
import { take } from "rxjs/operators";
import { DragData, DragDropService } from "./drag-drop.service";

@Directive({
  selector: "[appDrop]",
})
export class DropDirective {
  @Input() dropTags: string[] = []; // 目标区域
  @Output() dropend = new EventEmitter<DragData>();

  private _datas;
  private x;
  private y;
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {
    this._datas = this.service.getDragData().pipe(take(1)); // take 获取n个值
  }

  @HostListener("dragenter", ["$event"]) // drag的对象进入目标区域
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.target === this.el.nativeElement) {
      console.log(ev, 1);
    }
  }
  /**
   * //需要支持多级拖拽，所以要防止事件冒泡
   * //dragover允许进行data transfer的一些特效
   * @param ev
   */
  @HostListener("dragover", ["$event"]) // drag的对象在目标区域上面
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("000");
    this._datas.subscribe((datas) => {
      if (datas && this.dropTags.indexOf(datas.tag) > -1) {
        this.rd.setProperty(ev, "dataTransfer.effectAllowed", "all");
        this.rd.setProperty(ev, "dataTransfer.fropEffect", "move");
      } else {
        this.rd.setProperty(ev, "dataTransfer.effectAllowed", "none");
        this.rd.setProperty(ev, "dataTransfer.dropEffect", "none");
      }
    });
  }

  @HostListener("dragleave", ["$event"]) // drag的对象离开目标区域上面
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  /**
   * 注意：在拖拽事件中遇到目标元素ondrop事件没有效果的原因：需要在目标元素上写ondragover事件，阻止ondragover的默认行为，然后ondrop事件才起作用
   * @param ev
   */
  @HostListener("drop", ["$event"]) // 监听放的事件
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.target === this.el.nativeElement) {
      this._datas.subscribe((datas) => {
        if (datas && this.dropTags.indexOf(datas.tag) > -1) {
          const rectInfo = this.el.nativeElement.getBoundingClientRect();
          datas.x =
            ev["pageX"] -
            rectInfo.left -
            datas.el.nativeElement.offsetWidth / 2;
          datas.y =
            ev["pageY"] -
            rectInfo.top -
            datas.el.nativeElement.offsetHeight / 2;
          datas.width = datas.el.nativeElement.offsetWidth;
          datas.height = datas.el.nativeElement.offsetHeight;
          datas.rotate = 0;
          this.dropend.emit(datas); // drop的时候把dragData发射出去
          this.service.clearDragData(); // drop的时候把data clear掉，否则会影响下一次拖拽

          //   console.log(ev, 3);
          //   datas.el.style.position = "absolute";
          //   datas.el.style.left = ev.pageX - 210 + "px";
          //   datas.el.style.top = ev.pageY - 70 + "px";
          //   datas.el.setAttribute("isClone", "false");
          //   datas.el.setAttribute("dragTag", "main");
          //   this.rd.appendChild(this.el.nativeElement, datas.el);
          //   this.service.setDragData(null);
        }
      });
    }
  }
}
