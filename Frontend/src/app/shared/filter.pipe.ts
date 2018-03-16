import { Pipe, PipeTransform } from '@angular/core';

export class FilterType { type: string; }

@Pipe({ name: 'Filter' })
export class Filter implements PipeTransform {
  transform(items: FilterType[], myfilter: FilterType): FilterType[] {
    if (!items || !myfilter) return null;

    return items.filter(item => item.type.indexOf(myfilter.type) !== -1);
  }
}
