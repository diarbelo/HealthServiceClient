import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective implements OnInit {
  // tslint:disable-next-line: no-output-native
  @Output() public change = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    $(this.elementRef.nativeElement).datepicker({
      dateFormat: 'dd/MM/yy',
      changeYear: true,
      yearRange: '-100:+0',
      onSelect: (dateText) => {
        this.change.emit(dateText);
      }
    });
  }
}
