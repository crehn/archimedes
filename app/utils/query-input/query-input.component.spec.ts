import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QueryInputComponent } from './query-input.component';

describe('QueryInputComponent', function () {
    let fixture: ComponentFixture<QueryInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [QueryInputComponent] });

        fixture = TestBed.createComponent(QueryInputComponent);
        fixture.detectChanges();

        spyOn(fixture.componentInstance.onSubmitted, 'emit');
    });

    function getElement(query: string): DebugElement {
        return fixture.debugElement.query(By.css(query));
    }

    function getTextField() {
        return getElement('input[type="text"]').nativeElement;
    }

    function getButton() {
        return getElement('input[type="button"]').nativeElement;
    }


    function pressEnter() {
        let input = getElement('input[type="text"]');
        input.triggerEventHandler('keyup.enter', {});
    }

    function userInput(string: string) {
        let input = getTextField();
        input.value = string;
    }


    function expectOnSubmitted(value: string) {
        expect(fixture.componentInstance.onSubmitted.emit).toHaveBeenCalledWith(value);
    }


    describe('structure and defaults', () => {

        it('should have a text field', () => {
            let input = getTextField();

            expect(input).not.toBeNull();
        });

        it('should have a go button', () => {
            let button = getButton();

            expect(button.value).toBe('go');
        });

        it('should have a default value', () => {
            fixture.componentInstance.value = 'some value';
            fixture.detectChanges();

            let input = getTextField();
            expect(input.value).toBe('some value');
        });
    });


    describe('submit', () => {

        it('should submit empty string using button', () => {
            let button = getButton();

            button.click();

            expectOnSubmitted('');
        });

        it('should submit empty string using return', () => {
            pressEnter();

            expectOnSubmitted('');
        });

        it('should submit query using button', () => {
            let button = getButton();

            userInput('query');
            button.click();

            expectOnSubmitted('query');
        });

        it('should submit query using return', () => {
            userInput('query');
            pressEnter();

            expectOnSubmitted('query');
        });
    });
});
