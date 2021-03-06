import { DButtonComponent } from "../component/d-button/d-button.component";

export const componentList = {
  button: {
    index: 0,
    data: {
      component: DButtonComponent,
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
    },
  },
};
