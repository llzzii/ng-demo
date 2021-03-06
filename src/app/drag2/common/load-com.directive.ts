import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { HtmlList } from "./htmlList";

@Directive({ selector: "[appLoadCom]" })
export class LoadComDirective {
  constructor(private el: ElementRef, private rd: Renderer2) {}
  @Input() set appLoadCom(data) {
    const htmlList = new HtmlList(data.data);
    this.el.nativeElement.innerHTML = htmlList[data.type];
  }
}
