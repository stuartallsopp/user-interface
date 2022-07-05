import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecorationService {

  constructor() { }

  buttoncolour(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    return 'p-button-'+input;
  }

  alertcolour(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    return 'alert-'+input;
  }

  resolveNonePanelBackground(input:string)
  {
    var result="";
    result=result+this.bgcolour(input) + " " + this.bgcolouropac10(input) + " " + this.bgcolourtext(input);
    return result;
  }

  bgcolour(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    return 'bg-'+input;
  }
  bgcolourtext(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    if (input=='primary'){return 'text-white';}
    return 'text-' + input;
  }
  
  bgcolouropac10(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    return 'bg-opacity-10';
  }

  bgcolouropac25(input:string)
  {
    if (input==undefined||input==null||input==''||input=='none'){return '';}
    return 'bg-opacity-25';
  }
}
