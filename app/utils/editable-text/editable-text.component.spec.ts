import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
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
    @Output() onSubmit: EventEmitter<string> = new EventEmitter();

    submitted(value: string) {
        this.onSubmit.emit(value);
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
        spyOn(fixture.componentInstance.onSubmit, 'emit');
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

    function userInputReturn() {
        const input = getInput();
        input.triggerEventHandler('keyup.enter', null);
        fixture.detectChanges();
    }

    function userInputReturnAndBlur() {
        const input = getInput();
        input.triggerEventHandler('keyup.enter', null);
        input.triggerEventHandler('blur', null); // pressing return results in blur in the current implementation
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

    function expectSubmitted(value: string, times = 1) {
        expect(fixture.componentInstance.onSubmit.emit).toHaveBeenCalledTimes(times);
        expect(fixture.componentInstance.onSubmit.emit).toHaveBeenCalledWith(value);
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


    describe('edit and submit', () => {
        it('should display new text after edit', () => {
            doubleClickText();
            userInput(NEW_VALUE);
            blurInput();

            expectSpanWithText(NEW_VALUE);
        });

        it('should submit on blur', () => {
            doubleClickText();
            blurInput();

            expectSubmitted(VALUE);
        });

        it('should submit on return', () => {
            doubleClickText();
            userInputReturn();

            expectSubmitted(VALUE);
        });

        it('should submit only once on return', () => {
            doubleClickText();
            userInputReturnAndBlur();

            expectSubmitted(VALUE);
        });

        it('should be able to edit twice', () => {
            doubleClickText();
            userInput(NEW_VALUE);
            userInputReturnAndBlur();
            expectSubmitted(NEW_VALUE, 1);

            doubleClickText();
            userInput(VALUE);
            userInputReturnAndBlur();
            expectSubmitted(VALUE, 2);
        });

        it('should submit new text after edit', () => {
            doubleClickText();
            userInput(NEW_VALUE);
            blurInput();

            expectSubmitted(NEW_VALUE);
        });
    });
});
