import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent } from './app.component';
import { KanbanColumnComponent } from './components/kanban-column.component';
import { KanbanComponent } from './components/kanban.component';
import { SipCardComponent } from './components/sip-card.component';
import { SipDetailsComponent } from './components/sip-details.component';
import { CommandService } from './services/command.service';
import { SipCache } from './services/sip-cache.service';
import { SipGateway } from './services/sip-gateway.service';
import { AlertsComponent } from './utils/alerts/alerts.component';
import { DateSpanComponent } from './utils/date-span/date-span.component';
import { EditableMarkdownComponent } from './utils/inline-edits/editable-markdown.component';
import { EditableTextComponent } from './utils/inline-edits/editable-text.component';
import { FocusDirective } from './utils/inline-edits/focus.directive';
import { LabeledTextComponent } from './utils/labeled-text/labeled-text.component';
import { QueryInputComponent } from './utils/query-input/query-input.component';
import { TagListComponent } from './utils/taglist/taglist.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2BootstrapModule,
        DragulaModule
    ],
    declarations: [
        AppComponent,
        KanbanComponent,
        KanbanColumnComponent,
        QueryInputComponent,
        SipCardComponent,
        SipDetailsComponent,
        TagListComponent,
        DateSpanComponent,
        EditableMarkdownComponent,

        AlertsComponent,
        LabeledTextComponent,
        EditableTextComponent,
        FocusDirective,
    ],
    providers: [
        CommandService,
        SipGateway,
        SipCache
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
