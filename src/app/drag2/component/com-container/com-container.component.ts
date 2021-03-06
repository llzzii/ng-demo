import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { constants } from "buffer";
import { HtmlList } from "../../common/htmlList";

@Component({
  selector: "com-container",
  template: `<div #container></div> `,
  styles: [],
})
export class ComContainerComponent implements OnInit {
  @Input() title;
  @Input() index;
  @Input() config;
  safeHtml;
  @ViewChild("container", { static: true, read: ViewContainerRef })
  container: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private sanitizer: DomSanitizer
  ) {}
  loadComponent() {
    console.log(this.config, 69);
    if (!this.config) {
      return;
    }
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
    //   this.config.component
    // );
    // const componentRef = this.container.createComponent(componentFactory);
    // componentRef.instance["config"] = this.config;
    const htmlList = new HtmlList(this.config);
    const el = document.createElement("button");
    for (const key in this.config) {
      if (typeof this.config[key] === "function") {
        continue;
      }
      el.setAttribute(key, this.config[key]);
    }
    el.setAttribute("nz-button", "true");
    el.textContent = this.config.text;
    this.container.element.nativeElement.appendChild(el);
    // this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlList.button);
  }
  ngOnInit(): void {
    this.loadComponent();
  }
} // [innerHTML]="safeHtml"
