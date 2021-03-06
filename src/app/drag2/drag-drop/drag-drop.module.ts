import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDirective } from "./drag.directive";
import { DropDirective } from "./drop.directive";
import { DragDropService } from "./drag-drop.service";

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective],
  providers: [DragDropService],
  imports: [CommonModule],
})
export class DragDropModule {}
