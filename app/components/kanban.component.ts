import { Component, Input, QueryList, ViewChildren } from '@angular/core';

import { Sip } from '../models/sip';
import { KanbanColumnComponent } from './kanban-column.component';

@Component({
    selector: 'arch-kanban',
    styles: [`
    arch-sip-details {
        position: fixed;
        width:100%;
        height: 30%;
        top:70%;
        background: #FFFFCC;
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
    <arch-sip-details [sip]="selectedSip"></arch-sip-details>
    `
})
export class KanbanComponent {
    @Input() sips: Sip[];
    private selectedSip: Sip = null;

    @ViewChildren(KanbanColumnComponent)
    columns: QueryList<KanbanColumnComponent>;

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
        .notes {
            width: 100%;
            height: 7rem;
        }
    `],
    template: `
    <div class="sip-details col-md-12 row" *ngIf="sip">
        <div class="col-md-3">
            <span class="sip-title">{{sip.title}}</span><br/>
            <span class="sip-guid">{{sip.guid}}</span><br/>
            <div class="sip-icon"></div>
            <arch-labeled-text [value]="'status'">{{sip.status}}</arch-labeled-text>
            <arch-labeled-text [value]="'sourceUri'">{{sip.sourceUri}}</arch-labeled-text>
            <arch-labeled-text [value]="'originTimestamp'">{{sip.originTimestamp}}</arch-labeled-text>
            <arch-labeled-text [value]="'created'">{{sip.created}}</arch-labeled-text>
            <arch-labeled-text [value]="'modified'">{{sip.modified}}</arch-labeled-text>
            <arch-labeled-text [value]="'due'">{{sip.due}}</arch-labeled-text>
            <div>
                <label for="tags">Tags:</label>
                <span class="tags">
                    <span class="sip-tag label label-default" *ngFor="let tag of sip.tags">{{tag}}</span>
                </span>
            </div>
            <textarea class="notes">{{sip.notes}}</textarea>
        </div>
        <div class="col-md-9">
            {{sip.text}}
        </div>
    </div>
    `
})
export class SipDetailsComponent {
    @Input() sip: Sip;
}
