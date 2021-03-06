import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreedRoutingModule } from './threed-routing.module';
import { Demo1Component } from './demo1/demo1.component';
import { GltfComponent } from './gltf/gltf.component';

@NgModule({
  declarations: [Demo1Component, GltfComponent],
  imports: [CommonModule, ThreedRoutingModule],
})
export class ThreedModule {}
