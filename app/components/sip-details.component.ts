import { Component, Input } from '@angular/core';

import { Command, DeleteSipCommand, UpdateSipCommand } from '../models/command';
import { Sip } from '../models/sip';
import { CommandService } from '../services/command.service';

@Component({
    selector: 'arch-sip-details',
    styles: [`
        .sip-title {
            font-size: 2.5rem;
            display: block;
            margin-top: 0.25rem;
        }
        .meta {
            border-right: 1px solid silver;
        }
        .text {
            padding: 1rem;
        }
        arch-editable-markdown {
            width: 100%;
            height: 115px;
        }
        .glyphicon-trash, .undelete {
            float:right;
            margin: 0.75rem 0 0.75rem 0.75rem;
            cursor: pointer;
        }
        .undelete {
            color:red;
        }
    `],
    /* tslint:disable */
    template: `
    <div class="sip-details col-md-12 row">
        <div class="col-md-4 meta">
            <span class="glyphicon glyphicon-trash" (click)="deleteSip()" title="Delete" *ngIf="!undoCommand"></span>
            <a class="undelete" (click)="undeleteSip()" title="Undo deletion" *ngIf="undoCommand">Sip deleted -- undo</a>
            <arch-editable-text [class]="'sip-title'" [value]="sip.title" (onSubmit)="titleChanged(sip, $event)"></arch-editable-text>
            <span class="sip-guid">{{sip.guid}}</span><br/>
            <div class="sip-icon"></div>
            <arch-labeled-text [value]="'status'">{{sip.status}}</arch-labeled-text>
            <arch-labeled-text [value]="'sourceUri'">
                <arch-editable-text [value]="sip.sourceUri" (onSubmit)="sourceUriChanged(sip, $event)"></arch-editable-text>
            </arch-labeled-text>
            <arch-labeled-text [value]="'originTimestamp'">
                <arch-date-span [value]="sip.originTimestamp"></arch-date-span>
            </arch-labeled-text>
            <arch-labeled-text [value]="'created'">
                <arch-date-span [value]="sip.created"></arch-date-span>
            </arch-labeled-text>
            <arch-labeled-text [value]="'modified'">
                <arch-date-span [value]="sip.modified"></arch-date-span>
            </arch-labeled-text>
            <arch-labeled-text [value]="'due'">
                <arch-date-span [value]="sip.due"></arch-date-span>
            </arch-labeled-text>
            <arch-taglist [tags]="sip.tags"></arch-taglist>
            <arch-editable-markdown [value]="sip.notes" [hideToolbar]="true" (onSubmit)="notesChanged(sip, $event)">
            </arch-editable-markdown>
        </div>
        <div class="col-md-8 text">
            <arch-editable-markdown [value]="sip.text" (onSubmit)="textChanged(sip, $event)"></arch-editable-markdown>
        </div>
    </div>
    `
    /* tslint:enable */
})
export class SipDetailsComponent {
    private _sip: Sip;
    @Input() set sip(sip: Sip) {
        this._sip = sip;
        this.undoCommand = null;
    }
    get sip() {
        return this._sip;
    }

    private undoCommand: Command;

    constructor(private commandService: CommandService) {
    }

    deleteSip() {
        const command = new DeleteSipCommand(this.sip);
        this.commandService.execute(command);
        this.undoCommand = command.inverse();
    }

    undeleteSip() {
        this.commandService.execute(this.undoCommand);
        this.undoCommand = null;
    }

    titleChanged(sip: Sip, value: string) {
        if (sip.title !== value)
            this.commandService.execute(UpdateSipCommand.change(sip, s => s.title = value));
    }

    sourceUriChanged(sip: Sip, value: string) {
        if (sip.sourceUri !== value)
            this.commandService.execute(UpdateSipCommand.change(sip, s => s.sourceUri = value));
    }

    notesChanged(sip: Sip, value: string) {
        if (sip.notes !== value)
            this.commandService.execute(UpdateSipCommand.change(sip, s => s.notes = value));
    }

    textChanged(sip: Sip, value: string) {
        if (sip.text !== value)
            this.commandService.execute(UpdateSipCommand.change(sip, s => s.text = value));
    }
}
