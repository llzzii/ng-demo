import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DragDropService } from "./drag-drop.service";
import { DragDirective } from "./drag.directive";
import { DropDirective } from "./drop.directive";
import { ShapeDragDirective } from "./shape-drag.directive";
import { ShapeDropDirective } from "./shape-drop.directive";

@NgModule({
  declarations: [
    DragDirective,
    DropDirective,
    ShapeDragDirective,
    ShapeDropDirective,
  ],
  exports: [
    DragDirective,
    DropDirective,
    ShapeDragDirective,
    ShapeDropDirective,
  ],
  providers: [DragDropService],
  imports: [CommonModule],
})
export class DragDropModule {}
