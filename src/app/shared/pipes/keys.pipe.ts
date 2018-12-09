import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(array: any): any {
    if (!array) { return []; }
    return Object.keys(array);
  }
}
