import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appShapeDrag]",
})
export class ShapeDragDirective {
  @Input() item: string;
  @Input() config: any;
  @Input() cursors: any;

  constructor(private el: ElementRef, private rd: Renderer2) {}

  @HostListener("dragstart", ["$event"])
  ondragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      console.log(ev, 111231234);
    }
  }
  @HostListener("dragover", ["$event"]) // drag的对象在目标区域上面
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log(ev, 11123);

    if (ev.target === this.el.nativeElement) {
      console.log(ev, 11123);
    }
  }
  @HostListener("dragend", ["$event"])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
    }
  }
}
