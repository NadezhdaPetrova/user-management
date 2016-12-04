import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'contentFormat'})
export class ContentFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value : '-';
  }
}