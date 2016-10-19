import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EditableTextComponent, FocusDirective } from './editable-text.component';

@Component({
    selector: 'arch-editable-text-wrapper',
    template: `
    <arch-editable-text [value]="'value'" (onSubmit)="submitted($event)">inner</arch-editable-text>`
})
export class EditableTextWrapperComponent {
    value: string;

    submitted(value: string) {
        this.value = value;
    }
}

describe('EditableTextComponent', function () {
    let fixture: ComponentFixture<EditableTextWrapperComponent>;
    const VALUE = 'value';
    const NEW_VALUE = 'new-value';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [EditableTextComponent, EditableTextWrapperComponent, FocusDirective]
        });

        fixture = TestBed.createComponent(EditableTextWrapperComponent);
        fixture.detectChanges();
    });

    function getElement(query: string): DebugElement {
        return fixture.debugElement.query(By.css(query));
    }

    function getSpan() {
        return getElement('span');
    }

    function getGlyph() {
        return getElement('span.glyphicon');
    }

    function getInput() {
        return getElement('input');
    }


    function clickGlyph() {
        let glyph = getGlyph();
        glyph.nativeElement.click();
        fixture.detectChanges();
    }

    function doubleClickText() {
        let span = getSpan();
        span.triggerEventHandler('dblclick', null);
        fixture.detectChanges();
    }

    function blurInput() {
        let input = getInput();
        input.triggerEventHandler('blur', null);
        fixture.detectChanges();
    }

    function userInput(value: string) {
        getInput().nativeElement.value = value;
        fixture.detectChanges();
    }


    function expectSpanWithText(value = VALUE) {
        let span = getSpan();
        expect(span.nativeElement.innerText).toBe(value);
    }

    function expectPencilGlyph() {
        let glyph = getGlyph();
        expect(glyph.nativeElement.classList).toContain('glyphicon-pencil');
    }

    function expectInput() {
        let input = getInput();
        expect(input.nativeElement.type).toBe('text');
        expect(input.nativeElement.value).toBe(VALUE);
        expect(document.activeElement).toBe(input.nativeElement);
    }

    function expectSubmitted(value: string) {
        expect(fixture.componentInstance.value).toBe(value);
    }


    describe('initial state', () => {
        it('should display span and glyph', () => {
            expectSpanWithText();
            expectPencilGlyph();
        });

        it('should not display input at first', () => {
            expect(getInput()).toBeNull();
        });
    });


    describe('switch to edit mode', () => {
        it('should display input when clicking glyph', () => {
            clickGlyph();

            expectInput();
        });

        it('should not display span and glyph when clicking glyph', () => {
            clickGlyph();

            expect(getSpan()).toBeNull();
            expect(getGlyph()).toBeNull();
        });

        it('should display input when doubleclicking text', () => {
            doubleClickText();

            expectInput();
        });

        it('should not display span and glyph when doubleclicking text', () => {
            doubleClickText();

            expect(getSpan()).toBeNull();
            expect(getGlyph()).toBeNull();
        });
    });


    describe('switch back to display mode', () => {
        it('should display span and glyph after blur', () => {
            doubleClickText();
            blurInput();

            expectSpanWithText();
            expectPencilGlyph();
        });

        it('should not display input after blur', () => {
            doubleClickText();
            blurInput();

            expect(getInput()).toBeNull();
        });
    });


    describe('submit', () => {
        it('should submit on blur', () => {
            doubleClickText();
            blurInput();

            expectSubmitted(VALUE);
        });

        it('should submit new text after edit', () => {
            doubleClickText();
            userInput(NEW_VALUE);
            blurInput();

            expectSubmitted(NEW_VALUE);
        });

        it('should display new text after edit', () => {
            doubleClickText();
            userInput(NEW_VALUE);
            blurInput();

            expectSpanWithText(NEW_VALUE);
        });
    });
});
