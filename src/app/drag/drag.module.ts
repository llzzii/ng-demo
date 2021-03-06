import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftSiderComponent } from './left-sider/left-sider.component';
import { RightSiderComponent } from './right-sider/right-sider.component';
import { MainComponent } from './main/main.component';
import { DragDropModule } from './drag-drop/drag-drop.module';
import { CommonModule } from '@angular/common';
import { ListComponentModule } from './component/list-component.module';
import { NgZorroCustomModule } from './common/ng-zorro-custom.module';
import { PropComponent } from './right-sider/prop/prop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './right-sider/event/event.component';
const route: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    LeftSiderComponent,
    RightSiderComponent,
    MainComponent,
    PropComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponentModule,
    NgZorroCustomModule,
    DragDropModule,
    RouterModule.forChild(route),
  ],
  exports: [RouterModule],
})
export class DragModule {}
