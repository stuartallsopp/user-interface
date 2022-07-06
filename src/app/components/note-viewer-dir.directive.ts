import { AfterViewInit, Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[note-test]'
})
export class NoteViewerDirDirective implements AfterViewInit {

  @Output() ready=new EventEmitter<any>();


  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
        this.ready.emit();
    }, 1000);

  }

}
