import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[archAutoFocus]'
})
export class FocusDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }
    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}
