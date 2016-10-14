import { Component, Input } from '@angular/core';

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
