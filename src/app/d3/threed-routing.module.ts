import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Demo1Component } from "./demo1/demo1.component";
import { GltfComponent } from "./gltf/gltf.component";

const routes: Routes = [
  {
    path: "",
    component: Demo1Component,
  },
  {
    path: "gltf",
    component: GltfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreedRoutingModule {}
