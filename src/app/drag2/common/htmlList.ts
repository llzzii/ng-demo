export class HtmlList {
  config = {};
  button = "";
  constructor(config) {
    this.config = config;
    this.button = `<button
        nz-button
        [nzType]="'${config.nzType}'"
        [disabled]="'true' == ${config.disabled}"
        [nzGhost]="'true' == ${config.nzGhost}"
        [nzLoading]="'true' == ${config.nzLoading}"
        [nzShape]="${config.nzShape}"
        [nzBlock]="'true' == ${config.nzBlock}"
        [nzDanger]="'true' == ${config.nzDanger}"
        (click)="${config.buttonClick}"
        [nzSize]="${config.nzSize}"
      >
        <i *ngIf="${config.icon} != ''" nz-icon [nzType]="${config.icon}"></i>
         ${config.text}
      </button> `;
  }
}
