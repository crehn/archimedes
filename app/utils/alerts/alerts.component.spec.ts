import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { Alert, AlertType } from './alert';
import { AlertsComponent } from './alerts.component';

describe('AlertsComponent', function () {
    let fixture: ComponentFixture<AlertsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Ng2BootstrapModule],
            declarations: [AlertsComponent]
        });

        fixture = TestBed.createComponent(AlertsComponent);
        fixture.detectChanges();
    });

    function addDangerAlert() {
        fixture.componentInstance.add(AlertType.danger, 'alert-text');
        fixture.detectChanges();
    }

    function getElement(query: string): DebugElement {
        return fixture.debugElement.query(By.css(query));
    }

    function getCloseButton() {
        return getElement('button').nativeElement;
    }

    function getDiv() {
        const div = getElement('div');
        return div === null ? null : div.nativeElement;
    }

    it('should display bootstrap-alert', () => {
        addDangerAlert();

        let alertDiv = getDiv();
        expect(alertDiv.classList).toContain('alert');
        expect(alertDiv.classList).toContain('alert-danger');
    });

    it('should display text', () => {
        addDangerAlert();

        let alertDiv = getDiv();
        expect(alertDiv.textContent).toContain('alert-text');
    });

    it('should be able to use alert object', () => {
        fixture.componentInstance.add(new Alert(AlertType.danger, 'alert-text'));
        fixture.detectChanges();

        let alertDiv = getDiv();
        expect(alertDiv.textContent).toContain('alert-text');
    });

    it('should have a close button', () => {
        addDangerAlert();

        let closeButton = getCloseButton();

        expect(closeButton.textContent).toContain('×');
    });

    it('should close alert', () => {
        addDangerAlert();

        let closeButton = getCloseButton();
        closeButton.click();
        fixture.detectChanges();

        let alertDiv = getDiv();
        expect(alertDiv).toBeNull();
    });

    it('should display two alerts', () => {
        fixture.componentInstance.add(AlertType.danger, 'alert-text');
        fixture.componentInstance.add(AlertType.warning, 'alert-text2');
        fixture.detectChanges();

        let alertDiv = getElement('div.alert-danger');
        expect(alertDiv.nativeElement.textContent).toContain('alert-text');
        let alertDiv2 = getElement('div.alert-warning');
        expect(alertDiv2.nativeElement.textContent).toContain('alert-text2');
    });

    it('should close one of two alerts', () => {
        fixture.componentInstance.add(AlertType.danger, 'alert-text');
        fixture.componentInstance.add(AlertType.warning, 'alert-text2');
        fixture.detectChanges();

        let closeButton = getCloseButton();
        closeButton.click();
        fixture.detectChanges();

        let alertDiv = getElement('div.alert-danger');
        expect(alertDiv).toBeNull();
        let alertDiv2 = getElement('div.alert-warning');
        expect(alertDiv2).not.toBeNull();
    });
});
