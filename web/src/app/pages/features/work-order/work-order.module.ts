import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderPipe } from '../work-order.pipe';
import { WorkOrderComponent } from './work-order.component';



@NgModule({
  declarations: [
    WorkOrderPipe,
    WorkOrderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkOrderModule { }
