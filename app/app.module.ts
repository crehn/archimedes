import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { KanbanComponent, LabeledTextComponent, SipCardComponent, SipDetailsComponent } from './components/kanban.component';
import { QueryInputComponent } from './components/query-input.component';
import { SipGateway } from './services/sip-gateway.service';
import { AlertsComponent } from './utils/alerts/alerts.component';

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
