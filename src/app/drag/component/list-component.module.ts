import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgZorroCustomModule } from "../common/ng-zorro-custom.module";
import { DragDropModule } from '../drag-drop/drag-drop.module';
import { BoundStylePipe } from "./bound-style.pipe";
import { ComContainerComponent } from "./com-container/com-container.component";
import { DButtonComponent } from "./d-button/d-button.component";

@NgModule({
  declarations: [DButtonComponent, ComContainerComponent, BoundStylePipe],
  imports: [CommonModule, DragDropModule, NgZorroCustomModule],
  exports: [DButtonComponent, ComContainerComponent],
  providers: [BoundStylePipe],
})
export class ListComponentModule {}
