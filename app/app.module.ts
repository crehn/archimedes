import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { KanbanColumnComponent } from './components/kanban-column.component';
import { KanbanComponent, SipDetailsComponent } from './components/kanban.component';
import { QueryInputComponent } from './components/query-input.component';
import { SipCardComponent } from './components/sip-card.component';
import { SipGateway } from './services/sip-gateway.service';
import { AlertsComponent } from './utils/alerts/alerts.component';
import { LabeledTextComponent } from './utils/labeled-text/labeled-text.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2BootstrapModule
    ],
    declarations: [
        AppComponent,
        QueryInputComponent,
        KanbanComponent,
        KanbanColumnComponent,
        SipCardComponent,
        SipDetailsComponent,
        LabeledTextComponent,
        AlertsComponent,
    ],
    providers: [
        SipGateway
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
