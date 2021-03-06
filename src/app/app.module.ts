import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from "echarts/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { zh_CN } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzButtonModule } from "ng-zorro-antd/button";
import { TopuComponent } from "./topu/topu.component";
import { BigChartComponent } from "./big-chart/big-chart.component";
import { EarthComponent } from "./earth/earth.component";
import { NgZorroCustomModule } from "./drag/common/ng-zorro-custom.module";
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadFileComponent,
    TopuComponent,
    BigChartComponent,
    EarthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroCustomModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    FormsModule,
    BrowserAnimationsModule,
    NzProgressModule,
    NzButtonModule,
    NzMenuModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
