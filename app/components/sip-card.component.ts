import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Sip } from '../models/sip';

@Component({
    selector: 'arch-sip-card',
    styles: [`
    .sip {
        border: 1px solid gray;
        padding: 0.75rem;
        background-color: white;
    }
    .sip-selected {
        background-color: #e6f2ff;
    }
    .sip-title {
        font-size:large;
    }
    .sip-guid {
        font-family: monospace;
        font-size: 1rem;
        color: gray;
    }
    `],
    template: `
    <div class="sip" [class.sip-selected]="selected">
        <div class="sip-icon" (click)="iconClicked()"></div>
        <span class="sip-title">{{sip.title}}</span><br/>
        <arch-labeled-text [value]="'status'">{{sip.status}}</arch-labeled-text>
        <span class="sip-guid">{{sip.guid}}</span><br/>
        <arch-taglist [tags]="sip.tags"></arch-taglist>
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
