import { AfterViewInit, Component, ElementRef, Input, ViewChildren } from '@angular/core';

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
            <span #tagSpan class="sip-tag label label-default" *ngFor="let tag of tags">{{tag}}</span>
        </span>
    </div>
    `
})
export class TagListComponent implements AfterViewInit {
    @Input() tags: string[];

    @ViewChildren('tagSpan')
    tagSpans: ElementRef[];

    ngAfterViewInit() {
        this.tagSpans
            .map(span => <HTMLElement>span.nativeElement)
            .forEach(span => span.style.backgroundColor = this.getColor(span));
    }

    private getColor(span: HTMLElement): string {
        let tagName = span.innerText;
        let hash = 0;
        for (let char of tagName) {
            /* tslint:disable */
            hash = ((hash << 5) - hash) + char.charCodeAt(0);
            hash = hash & hash; // Convert to 32bit integer
            /* tslint:enable */
        }
        let hashString = hash.toString(16);
        return '#' + hashString + '000000'.substring(hashString.length);
    }
}
