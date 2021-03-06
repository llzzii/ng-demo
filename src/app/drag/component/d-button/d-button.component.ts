import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "d-button",
  template: `<button
    nz-button
    [nzType]="_config.nzType"
    [disabled]="'true' == _config.disabled"
    [nzGhost]="'true' == _config.nzGhost"
    [nzLoading]="'true' == _config.nzLoading"
    [nzShape]="_config.nzShape"
    [nzBlock]="'true' == _config.nzBlock"
    [nzDanger]="'true' == _config.nzDanger"
    (click)="_config.buttonClick($event)"
    [nzSize]="_config.nzSize"
    [ngStyle]="styles"
  >
    <i *ngIf="_config.icon != ''" nz-icon [nzType]="_config.icon"></i>
    {{ _config.text }}
  </button> `,
  styles: [],
})
export class DButtonComponent implements OnInit {
  styles = {};
  _config: any = {
    nzType: "primary",
    icon: "",
    disabled: false,
    nzGhost: false,
    nzLoading: false,
    nzShape: "",
    nzSize: "default",
    nzBlock: false,
    nzDanger: false,
    text: "按钮",
    buttonClick: (e) => {
      console.log(e);
    },
  };
  constructor() {}
  @Input()
  set config(val) {
    console.log(val, 321);
    if (val && val.width) {
      this._config = val.data;

      this.styles = {
        width: val.width + "px",
        height: val.height + "px",
      };
      console.log(this.styles);
    } else {
      this._config = val;
    }
  }

  ngOnInit(): void {}
}
