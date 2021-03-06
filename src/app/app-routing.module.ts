import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BigChartComponent } from "./big-chart/big-chart.component";
import { EarthComponent } from "./earth/earth.component";
import { HomeComponent } from "./home/home.component";
import { TopuComponent } from "./topu/topu.component";
import { UploadFileComponent } from "./upload-file/upload-file.component";

const routes: Routes = [
  {
    path: "d3",
    loadChildren: () =>
      import("./d3/threed.module").then((m) => {
        return m.ThreedModule;
      }),
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "upload",
    component: UploadFileComponent,
  },
  {
    path: "topu",
    component: TopuComponent,
  },
  {
    path: "earth",
    component: EarthComponent,
  },
  {
    path: "big",
    component: BigChartComponent,
  },
  {
    path: "drag",
    loadChildren: () => import("./drag/drag.module").then((m) => m.DragModule),
  },
  {
    path: "drag2",
    loadChildren: () => import("./drag2/drag.module").then((m) => m.DragModule),
  },
  {
    path: "svg",
    loadChildren: () => import("./svg/svg.module").then((m) => m.SvgModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
