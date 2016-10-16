import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

import { Sip } from '../models/sip';
import { SipCardComponent } from './sip-card.component';

@Component({
    selector: 'arch-kanban-column',
    styles: [`
    :host{
        border: 1px solid silver;
        background-color: #f7f7f7;
    }
    .kanban-column {
    }
    .kanban-column-header {
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    `],
    template: `
    <div class="kanban-column">
        <div class="kanban-column-header">{{name}}</div>
        <arch-sip-card *ngFor="let sip of filtered(sips)" [sip]="sip" (onSelectionChanged)="selectionChanged(sip, $event)"></arch-sip-card>
    </div>
    `
})
export class KanbanColumnComponent {
    @Input() name: string;
    @Input() status: string;
    @Input() sips: Sip[];
    @Output() onSelectionChanged = new EventEmitter();
    private selectedSip: Sip = null;

    @ViewChildren(SipCardComponent)
    cards: QueryList<SipCardComponent>;

    filtered(sips: Sip[]) {
        if (!sips)
            return null;
        return sips.filter(sip => sip.status === this.status);
    }

    selectionChanged(sip: Sip, value: boolean) {
        if (value)
            this.selectedSip = sip;
        else
            this.selectedSip = null;

        this.onSelectionChanged.emit(this.selectedSip);
    }

    public select(sip: Sip) {
        this.cards.forEach(card => {
            card.selected = card.sip === sip;
        });
    }
}
