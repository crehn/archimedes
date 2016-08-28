import { Component, Input } from '@angular/core';

import { Sip } from '../models/sip';

@Component({
    selector: 'arch-kanban',
    template: `
<div *ngFor="let sip of sips">
    <div>
        {{sip.title}}
    </div>
</div>
    `
})
export class KanbanComponent {
    @Input() sips: Sip[];

}
