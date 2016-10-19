import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DateSpanComponent } from './date-span.component';

@Component({
    selector: 'arch-date-span-wrapper',
    template: `
    <arch-date-span [value]="'2016-10-19T18:56:12Z'"></arch-date-span>`
})
export class DateSpanWrapperComponent {
}

describe('DateSpanComponent', function () {
    let fixture: ComponentFixture<DateSpanWrapperComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateSpanComponent, DateSpanWrapperComponent]
        });

        fixture = TestBed.createComponent(DateSpanWrapperComponent);
        fixture.detectChanges();
    });

    function getElement(query: string): DebugElement {
        return fixture.debugElement.query(By.css(query));
    }

    function getSpan() {
        return getElement('span');
    }


    it('should display date and time', () => {
        let span = getSpan();
        expect(span.nativeElement.innerText).toMatch(/2016-10-(19|20) \d\d:\d6:12 (\+|-)\d?\d:(00|15|30|45)/);
    });
});
