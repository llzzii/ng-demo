import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appShapeDrop]",
})
export class ShapeDropDirective {
  private _datas;
  private x;
  private y;
  constructor(private el: ElementRef, private rd: Renderer2) {}

  @HostListener("dragenter", ["$event"]) // drag的对象进入目标区域
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
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
    console.log(ev, 198);

    if (ev.target === this.el.nativeElement) {
      console.log(ev, 198);
    }
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
  }
}
