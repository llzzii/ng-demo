import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "d-button",
  template: `<button nz-button>
    <i *ngIf="config.icon != ''" nz-icon [nzType]="config.icon"></i>
    {{ config.text }}
  </button> `,
  styles: [],
})
export class DButtonComponent implements OnInit {
  @Input() config = {
    nzType: "primary",
    icon: "",
    disabled: "false",
    nzGhost: "false",
    nzLoading: "false",
    nzShape: "",
    nzSize: "default",
    nzBlock: "false",
    nzDanger: "false",
    text: "按钮",
    buttonClick: (e) => {
      console.log(e);
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
/*** [nzType]="config.nzType"
    [disabled]="'true' == config.disabled"
    [nzGhost]="'true' == config.nzGhost"
    [nzLoading]="'true' == config.nzLoading"
    [nzShape]="config.nzShape"
    [nzBlock]="'true' == config.nzBlock"
    [nzDanger]="'true' == config.nzDanger"
    (click)="config.buttonClick($event)"
    [nzSize]="config.nzSize" */
