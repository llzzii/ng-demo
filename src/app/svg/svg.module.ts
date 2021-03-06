import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgZorroCustomModule } from "../drag/common/ng-zorro-custom.module";

import { Demo1Component } from "./demo1/demo1.component";
import { Demo2Component } from "./demo2/demo2.component";

const route: Routes = [
  {
    path: "",
    component: Demo1Component,
  },
  {
    path: "demo2",
    component: Demo2Component,
  },
];

@NgModule({
  declarations: [Demo1Component, Demo2Component],
  imports: [CommonModule, NgZorroCustomModule, RouterModule.forChild(route)],
})
export class SvgModule {}
