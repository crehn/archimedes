import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';

@Component({
    selector: 'arch-editable-markdown',
    styles: [`
    .CodeMirror, .CodeMirror-scroll {
        min-height: 50px;
    }
    `],
    /* tslint:disable */
    template: `
    <textarea #simplemde>{{value}}</textarea>
    `
    /* tslint:enable */
})
export class EditableMarkdownComponent implements AfterViewInit {
    @Input() hideToolbar: boolean;
    @Output() onSubmit: EventEmitter<string> = new EventEmitter();
    private _value: string;
    @Input() set value(value: string) {
        this._value = value;
        if (this.mde)
            this.mde.value(value || '');
    }
    get value() {
        return this._value;
    }

    private mde: SimpleMDE;
    private editor: CodeMirror.Editor;

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
        this.mde = new SimpleMDE(this.buildOptions());
        this.editor = this.mde.codemirror;

        this.editor.on('blur', () => this.submit(this.mde.value()));
    }

    private buildOptions() {
        let options = this.DEFAULT_OPTIONS;
        options.element = this.textarea.nativeElement;
        if (this.hideToolbar)
            options.toolbar = false;
        return options;
    }

    submit(value: string) {
        this.onSubmit.emit(value);
    }
}
