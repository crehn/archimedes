import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TagListComponent } from './taglist.component';

describe('AlertsComponent', function () {
    let fixture: ComponentFixture<TagListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TagListComponent]
        });

        fixture = TestBed.createComponent(TagListComponent);
        fixture.detectChanges();
    });

    function getElements(query: string): DebugElement[] {
        return fixture.debugElement.queryAll(By.css(query));
    }

    function getTags(): DebugElement[] {
        return getElements('.sip-tag');
    }

    it('should display no tags', () => {
        let tags = getTags();

        expect(tags.length).toBe(0);
    });

    it('should display one tag', () => {
        fixture.componentInstance.tags = ['foo'];
        fixture.detectChanges();

        let tags = getTags();
        expect(tags.length).toBe(1);
        expect(tags[0].nativeElement.innerText).toBe('foo');
    });

    it('should display two tags', () => {
        fixture.componentInstance.tags = ['foo', 'bar'];
        fixture.detectChanges();

        let tags = getTags();
        expect(tags.length).toBe(2);
        expect(tags[0].nativeElement.innerText).toBe('foo');
        expect(tags[1].nativeElement.innerText).toBe('bar');
    });
});
