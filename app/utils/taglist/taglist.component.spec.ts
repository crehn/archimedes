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

    function getTags(): HTMLElement[] {
        return getElements('.sip-tag').map(el => el.nativeElement as HTMLElement);
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
        expect(tags[0].innerText).toBe('foo');
    });

    it('should display two tags', () => {
        fixture.componentInstance.tags = ['foo', 'bar'];
        fixture.detectChanges();

        let tags = getTags();
        expect(tags.length).toBe(2);
        expect(tags[0].innerText).toBe('foo');
        expect(tags[1].innerText).toBe('bar');
    });

    it('should specify background-color based on tag', () => {
        fixture = TestBed.createComponent(TagListComponent);
        fixture.componentInstance.tags = ['foo', 'bar', 'leute', 'pantarhei'];
        fixture.detectChanges();

        let tags = getTags();
        expectColor(tags[0], 'foo', 'rgb(24, 204, 96)');
        expectColor(tags[1], 'bar', 'rgb(23, 193, 48)');
        expectColor(tags[2], 'leute', 'rgb(98, 25, 152)');
        expectColor(tags[3], 'pantarhei', 'rgb(63, 81, 131)');
    });

    function expectColor(tag: HTMLElement, tagName: string, color: string) {
        expect(tag.innerText).toBe(tagName);
        expect(tag.style.backgroundColor).toBe(color);
    }
});
