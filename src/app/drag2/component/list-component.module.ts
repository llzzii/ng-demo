import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DButtonComponent } from "./d-button/d-button.component";
import { ComContainerComponent } from "./com-container/com-container.component";
import { NgZorroCustomModule } from "../../drag/common/ng-zorro-custom.module";

@NgModule({
  declarations: [DButtonComponent, ComContainerComponent],
  imports: [CommonModule, NgZorroCustomModule],
  exports: [DButtonComponent, ComContainerComponent],
})
export class ListComponentModule {}
