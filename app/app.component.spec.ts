import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { KanbanComponent } from './components/kanban.component';
import { QueryInputComponent } from './components/query-input.component';
import { SipGateway } from './services/sip-gateway.service';
import { AlertsComponent } from './utils/alerts/alerts.component';

describe('AppComponent', function () {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                Ng2BootstrapModule,
                HttpModule
            ],
            declarations: [
                AppComponent,
                QueryInputComponent,
                KanbanComponent,
                AlertsComponent
            ],
            providers: [
                SipGateway
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
