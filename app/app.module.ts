import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KanbanComponent } from './components/kanban.component';
import { QueryInputComponent } from './components/query-input.component';
import { SipGateway } from './services/sip-gateway.service';

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent,
        QueryInputComponent,
        KanbanComponent
    ],
    providers: [
        SipGateway
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
