import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'arch-editable-markdown',
    styles: [`
    .CodeMirror, .CodeMirror-scroll {
        min-height: 50px;
    }
    `],
    template: `
    <textarea #simplemde>{{value}}</textarea>
    `
})
export class EditableMarkdownComponent implements AfterViewInit {
    @Input() value: string;
    @Input() hideToolbar: boolean;
    @Output() onSubmit: EventEmitter<string> = new EventEmitter();
    private mde: SimpleMDE;

    @ViewChild('simplemde')
    textarea: ElementRef;

    private readonly DEFAULT_OPTIONS: SimpleMDE.Options = {
        indentWithTabs: false,
        renderingConfig: { codeSyntaxHighlighting: true },
        showIcons: ['strikethrough', 'code', 'clean-block', 'horizontal-rule', 'table'],
        spellChecker: true,
        tabSize: 4,
    };

    ngAfterViewInit() {
        let options = this.DEFAULT_OPTIONS;
        options.element = this.textarea.nativeElement;
        if (this.hideToolbar)
            options.toolbar = false;
        this.mde = new SimpleMDE(options);
    }

    submit(value: string) {
        this.onSubmit.emit(value);
    }
}
