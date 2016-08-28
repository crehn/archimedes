import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QueryInputComponent } from './query-input.component';

describe('QueryInputComponent', function () {
    let fixture: ComponentFixture<QueryInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [QueryInputComponent] });
        fixture = TestBed.createComponent(QueryInputComponent);
        fixture.detectChanges();
    });

    function getElement(query: string): any {
        return fixture.debugElement.query(By.css(query)).nativeElement;
    }

    it('should instantiate component', () => {
        expect(fixture.componentInstance instanceof QueryInputComponent).toBe(true);
    });

    it('should have a text field', () => {
        let input = getElement('input[type="text"]');

        expect(input).not.toBeNull();
    });

    it('should have a go button', () => {
        let input = getElement('input[type="button"]');

        expect(input.value).toBe('go');
    });
});
