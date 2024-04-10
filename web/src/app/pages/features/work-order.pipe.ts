import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workOrder'
})
export class WorkOrderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
