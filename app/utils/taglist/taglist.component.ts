import { Component, Input } from '@angular/core';

@Component({
    selector: 'arch-taglist',
    styles: [`
    .sip-tag {
        margin-right: 0.5rem;
    }
    `],
    template: `
    <div>
        <label for="tags">Tags:</label>
        <span class="tags">
            <span class="sip-tag label label-default" *ngFor="let tag of tags">{{tag}}</span>
        </span>
    </div>
    `
})
export class TagListComponent {
    @Input() tags: string[];
}
