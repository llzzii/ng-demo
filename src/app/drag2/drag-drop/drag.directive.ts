import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";
import { DragDropService } from "./drag-drop.service";

@Directive({
  selector: "[appDrag]",
})
export class DragDirective {
  private _isDraggable = false;
  @Input() dragTag: string;
  @Input() dragData: any;
  @Input() isClone = true;
  @Input() dragClass = "dragging";

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {}
  /**
   * @description 获取目标元素并给他设置是否可拖拽
   * @memberof DragDirective
   */
  @Input("appDrag")
  set isDraggable(val) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, "draggable", `${val}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  @HostListener("dragstart", ["$event"])
  ondragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.service.setDragData({
        tag: this.dragTag,
        data: Object.assign({}, this.dragData),
        el: this.el,
      });
      this.rd.addClass(this.el.nativeElement, this.dragClass);
    }
  }

  @HostListener("dragend", ["$event"])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.service.setDragData({
        tag: this.dragTag,
        data: Object.assign({}, this.dragData),
        el: this.el,
      });
      this.rd.removeClass(this.el.nativeElement, this.dragClass);
    }
  }
}
