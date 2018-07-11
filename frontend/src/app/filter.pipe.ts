import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterText'
})
export class FilterPipe implements PipeTransform {

  transform(restaurants: any, search: any): any {
    console.log(restaurants);
    console.log(search);
    if (!restaurants || !search) {
      return restaurants;
    }
    return restaurants.filter(res =>
      (res.restaurant_location.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      || (res.restaurant_name.toLowerCase().indexOf(search.toLowerCase()) !== -1));
  }
}
