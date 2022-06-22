import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }

  get(size:number)
  {
    switch(size)
    {
      case 1:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-1 xl:block xl:col-1";
      case 2:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-2 xl:block xl:col-2";
      case 3:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-3 xl:block xl:col-3";
      case 4:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-4 xl:block xl:col-4";
      case 5:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-5 xl:block xl:col-5";
      case 6:
        return "col-12 sm:block sm:col-12 md:block md:col-6 lg:block lg:col-6 xl:block xl:col-6";
      case 7:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-7 xl:block xl:col-7";
      case 8:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-8 xl:block xl:col-8";
      case 9:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-9 xl:block xl:col-9";
      case 10:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-10 xl:block xl:col-10";
      case 11:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-11 xl:block xl:col-11";
      case 12:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-12 xl:block xl:col-12";
      default:
        return "col-12 sm:block sm:col-12 md:block md:col-12 lg:block lg:col-12 xl:block xl:col-12";
    }
   
  }
}
