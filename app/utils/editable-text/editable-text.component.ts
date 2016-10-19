import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[archAutoFocus]'
})
export class FocusDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }
    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}

@Component({
    selector: 'arch-editable-text',
    styles: [`
    .glyphicon-pencil {
        cursor: pointer;
        font-size: 0.7em;
    }
    `],
    template: `
    <span [attr.class]="cssClass" (dblclick)="edit()" *ngIf="!editMode">{{value}}</span>
    <span class="glyphicon glyphicon-pencil" (click)="edit()" *ngIf="!editMode"></span>
    <input type="text" #input archAutoFocus [attr.class]="cssClass" 
        (blur)="submit(input.value)" (keyup.enter)="submit(input.value)" *ngIf="editMode" value="{{value}}">
    `
})
export class EditableTextComponent {
    @Input() cssClass: string;
    @Input() value: string;
    @Output() onSubmit: EventEmitter<string> = new EventEmitter();
    editMode: boolean;
    submitted = false;

    edit(input: HTMLElement) {
        this.editMode = true;
        this.submitted = false;
    }

    submit(value: string) {
        if (!this.submitted) {
            this.submitted = true;
            this.editMode = false;
            this.value = value;
            this.onSubmit.emit(value);
        }
    }
}
