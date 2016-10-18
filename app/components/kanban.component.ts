import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { UpdateSipCommand } from '../models/command';
import { Sip } from '../models/sip';
import { CommandService } from '../services/command.service';
import { SipCache } from '../services/sip-cache.service';
import { KanbanColumnComponent } from './kanban-column.component';

@Component({
    selector: 'arch-kanban',
    styles: [`
    arch-sip-details {
        position: fixed;
        width:100%;
        height: 40%;
        top:60%;
        background: #FFFFCC;
        border-top: 5px solid silver;
    }
    `],
    template: `
    <div class="row">
        <arch-kanban-column [name]="'Backlog'" [status]="'open'" 
            [sips]="sips" (onSelectionChanged)="selectionChanged($event)" class="col-md-3">
        </arch-kanban-column>
        <arch-kanban-column [name]="'To Do'" [status]="'todo'" 
            [sips]="sips" (onSelectionChanged)="selectionChanged($event)" class="col-md-3">
        </arch-kanban-column>
        <arch-kanban-column [name]="'In Progress'" [status]="'in-progress'" 
            [sips]="sips" (onSelectionChanged)="selectionChanged($event)" class="col-md-3">
        </arch-kanban-column>
        <arch-kanban-column [name]="'Done'" [status]="'closed'" 
            [sips]="sips" (onSelectionChanged)="selectionChanged($event)" class="col-md-3">
        </arch-kanban-column>
    </div>
    <arch-sip-details [sip]="selectedSip" *ngIf="selectedSip"></arch-sip-details>
    `
})
export class KanbanComponent implements OnInit {
    @Input() sips: Sip[];
    private selectedSip: Sip = null;

    @ViewChildren(KanbanColumnComponent)
    columns: QueryList<KanbanColumnComponent>;

    constructor(private repo: SipCache,
        private commandService: CommandService,
        private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value: any[]) => {
            let [bagName, el, target, source, sibling] = value;
            this.onDrop(el, target, source, sibling);
        });
    }

    ngOnInit() {
        this.repo.sipsChanged.subscribe(
            (sips: Sip[]) => this.sips = sips
        );
    }

    private onDrop(el: HTMLElement, target: HTMLDivElement, source: HTMLDivElement, sibling: HTMLElement) {
        let newStatus = target.getAttribute('data-status');
        let guid = el.getAttribute('data-guid');
        let sip = this.repo.getSip(guid);
        let oldStatus = sip.status;
        if (newStatus !== oldStatus) {
            this.commandService.execute(UpdateSipCommand.createStatusUpdate(sip, newStatus));
        }
    }

    public selectionChanged(sip: Sip) {
        this.selectedSip = sip;

        this.columns.forEach(col => {
            col.select(sip);
        });
    }
}

@Component({
    selector: 'arch-sip-details',
    styles: [`
        .meta {
            border-right: 1px solid silver;
        }
        .text {
            padding: 1rem;
        }
        .notes {
            width: 100%;
            height: 115px;
        }
    `],
    template: `
    <div class="sip-details col-md-12 row">
        <div class="col-md-3 meta">
            <h3 class="sip-title">{{sip.title}}</h3>
            <span class="sip-guid">{{sip.guid}}</span><br/>
            <div class="sip-icon"></div>
            <arch-labeled-text [value]="'status'">{{sip.status}}</arch-labeled-text>
            <arch-labeled-text [value]="'sourceUri'">{{sip.sourceUri}}</arch-labeled-text>
            <arch-labeled-text [value]="'originTimestamp'">{{sip.originTimestamp}}</arch-labeled-text>
            <arch-labeled-text [value]="'created'">{{sip.created}}</arch-labeled-text>
            <arch-labeled-text [value]="'modified'">{{sip.modified}}</arch-labeled-text>
            <arch-labeled-text [value]="'due'">{{sip.due}}</arch-labeled-text>
            <arch-taglist [tags]="sip.tags"></arch-taglist>
            <textarea class="notes">{{sip.notes}}</textarea>
        </div>
        <div class="col-md-9 text">
            {{sip.text}}
        </div>
    </div>
    `
})
export class SipDetailsComponent {
    @Input() sip: Sip;
}
