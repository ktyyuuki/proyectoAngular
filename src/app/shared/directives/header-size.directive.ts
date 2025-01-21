import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaderSize]',
  standalone: false
})
export class HeaderSizeDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '20px';
    this.elementRef.nativeElement.style.fontWeight = 'bold';
  }

}
