import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', function () {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        });
    });

    it('should instantiate component', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

    it('should have query input', () => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        let input = fixture.debugElement.query(By.css('arch-query-input')).nativeElement;

        expect(input).not.toBeNull();
    });

    it('should have kanban', () => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        let kanban = fixture.debugElement.query(By.css('arch-kanban')).nativeElement;

        expect(kanban).not.toBeNull();
    });
});
