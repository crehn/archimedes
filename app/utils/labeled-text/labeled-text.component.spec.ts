import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LabeledTextComponent } from './labeled-text.component';

@Component({
    selector: 'arch-labeled-text-wrapper',
    template: `
    <arch-labeled-text [value]="'value'">inner</arch-labeled-text>`
})
export class LabeledTextWrapperComponent {
}

describe('LabeledTextComponent', function () {
    let fixture: ComponentFixture<LabeledTextWrapperComponent>;
    const VALUE = 'value';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LabeledTextComponent, LabeledTextWrapperComponent]
        });

        fixture = TestBed.createComponent(LabeledTextWrapperComponent);
        fixture.detectChanges();
    });

    function getElement(query: string): DebugElement {
        return fixture.debugElement.query(By.css(query));
    }

    function getLabel() {
        return getElement('label');
    }

    function getSpan() {
        return getElement('span');
    }

    it('should display label', () => {
        let label = getLabel();
        expect(label.nativeElement.innerText).toBe(VALUE + ':');
        expect(label.attributes['for']).toBe(VALUE);

        let span = getSpan();
        expect(span.attributes['name']).toBe(VALUE);
    });

    it('should display content', () => {
        let span = getSpan();
        expect(span.nativeElement.innerText).toContain('inner');
    });
});
