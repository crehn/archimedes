import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Sip } from '../models/sip';

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
sips:
<arch-sip-card *ngFor="let sip of sips" [sip]="sip" (onSelectionChanged)="selectionChanged(sip, $event)"></arch-sip-card>
<arch-sip-details [sip]="selectedSip"></arch-sip-details>
    `
})
export class KanbanComponent {
    @Input() sips: Sip[];
    private selectedSip: Sip = null;

    public selectionChanged(sip: Sip, value: boolean) {
        if (value)
            this.selectedSip = sip;
        else
            this.selectedSip = null;
    }
}

@Component({
    selector: 'arch-sip-card',
    styles: [`
    .sip {
        border: 1px solid gray;
        padding: 0.75rem;
    }
    .sip-title {
        font-size:large;
    }
    .sip-guid {
        font-family: monospace;
        font-size: small;
        color: gray;
    }
    .sip-tag {
        margin-right: 0.5rem;
    }
    `],
    template: `
    <div class="sip">
        <div class="sip-icon" (click)="iconClicked()"></div>
        <span class="sip-title">{{sip.title}}</span><br/>
        <span class="sip-guid">{{sip.guid}}</span><br/>
        <arch-labeled-text [value]="'status'">{{sip.status}}</arch-labeled-text>
        <label for="tags">Tags:</label>
        <span class="tags">
            <span class="sip-tag label label-default" *ngFor="let tag of sip.tags">{{tag}}</span>
        </span>
    </div>
    `
})
export class SipCardComponent {
    @Input() sip: Sip;
    @Input() selected: boolean = false;
    @Output() onSelectionChanged = new EventEmitter();

    public iconClicked() {
        this.selected = !this.selected;
        this.onSelectionChanged.emit(this.selected);
    }
}

@Component({
    selector: 'arch-labeled-text',
    template: `
    <label [attr.for]="value">{{value}}:</label>
    <span class="sip-{{value}}" [attr.name]="value">
        <ng-content></ng-content>
    </span>
    <br/>
    `
})
export class LabeledTextComponent {
    @Input() value: string;
}

@Component({
    selector: 'arch-sip-details',
    template: `
    <div class="sip-details" *ngIf="sip">
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
            <label for="tags">Tags:</label>
            <span class="tags">
                <span class="sip-tag label label-default" *ngFor="let tag of sip.tags">{{tag}}</span>
            </span>
            <textarea>{{sip.notes}}</textarea>
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
