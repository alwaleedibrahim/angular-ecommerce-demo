import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[CardStyle]',
  standalone: true,
})
export class CardStyleDirective implements OnChanges {
  @Input() defaultShadow: string = ''
  @Input() secondaryShadow : string = ''
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.borderRadius = '5%';
  }
  ngOnChanges(): void {
    this.elementRef.nativeElement.style.boxShadow = this.defaultShadow;
  }
   

  @HostListener('mouseover')
  onMouseOver() {
    this.elementRef.nativeElement.style.boxShadow = this.secondaryShadow;
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.elementRef.nativeElement.style.boxShadow = this.defaultShadow;
  }
}
