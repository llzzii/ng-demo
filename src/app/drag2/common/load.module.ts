import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadComDirective } from "./load-com.directive";
import { LoadComPipe } from "./load-com.pipe";

@NgModule({
  declarations: [LoadComDirective, LoadComPipe],
  imports: [CommonModule],
  exports: [LoadComDirective, LoadComPipe],
})
export class LoadModule {}
