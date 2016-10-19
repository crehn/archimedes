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
    <span [attr.class]="cssClass" (dblclick)="edit()" *ngIf="!editMode">{{text}}</span>
    <span class="glyphicon glyphicon-pencil" (click)="edit()" *ngIf="!editMode"></span>
    <input type="text" archAutoFocus [attr.class]="cssClass" (blur)="submit()" *ngIf="editMode" [(ngModel)]="text">
    `
})
export class EditableTextComponent {
    @Input() cssClass: string;
    @Input() text: string;
    @Output() onSubmit: EventEmitter<string> = new EventEmitter();
    editMode: boolean;

    edit(input: HTMLElement) {
        this.editMode = true;
    }

    submit() {
        this.editMode = false;
        this.onSubmit.emit(this.text);
    }
}
