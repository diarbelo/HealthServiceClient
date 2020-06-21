import { Directive, ElementRef, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective implements OnInit {
  // tslint:disable-next-line: no-output-native
  @Output() public change = new EventEmitter();
  @Input() public years: string;

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    $(this.elementRef.nativeElement).datepicker({
      dateFormat: 'dd/MM/yy',
      changeYear: true,
      yearRange: this.years,
      onSelect: (dateText) => {
        this.change.emit(dateText);
      }
    });
  }
}
