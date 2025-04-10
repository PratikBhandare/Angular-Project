import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardContent',
  standalone: false
})
export class CardContentPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // console.log(value);
    
    return (value as string).substring(0,200);
  }

}
