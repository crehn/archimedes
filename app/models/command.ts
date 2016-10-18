import { Observable } from 'rxjs/Observable';

import { Sip } from './sip';
import { SipRepository } from './sip-repository';

export enum CommandType {
    CREATE,
    UPDATE,
    DELETE
}

export abstract class Command {
    readonly type: CommandType;
    private executed: boolean = false;
    readonly sipBefore: Sip;
    readonly sipAfter: Sip;

    constructor(sipBefore: Sip, sipAfter: Sip) {
        this.sipBefore = sipBefore;
        this.sipAfter = sipAfter;
    }

    public get isExecuted(): boolean {
        return this.executed;
    }

    public execute(repo: SipRepository) {
        if (this.executed)
            throw 'cannot execute twice';

        this.doExecute(repo).subscribe(
            () => this.executed = true,
            error => console.log('could not execute command: ' + this + ' due to ' + error));
    }

    abstract doExecute(repo: SipRepository): Observable<void>;

    public toString(): string {
        return this.type + ' ' + this.sipAfter.guid;
    }
}

export class CreateSipCommand extends Command {
    type = CommandType.CREATE;

    constructor(sip: Sip) {
        super(null, sip);
    }

    public doExecute(repo: SipRepository): Observable<void> {
        return repo.create(this.sipAfter);
    }
}

export class UpdateSipCommand extends Command {
    type = CommandType.UPDATE;

    public static createStatusUpdate(sip: Sip, newStatus: string) {
        const sipBefore = Object.assign({}, sip);
        const sipAfter = Object.assign({}, sip);
        sipAfter.status = newStatus;
        return new UpdateSipCommand(sipBefore, sipAfter);
    }

    public doExecute(repo: SipRepository): Observable<void> {
        return repo.update(this.sipAfter);
    }
}

export class DeleteSipCommand extends Command {
    type = CommandType.DELETE;

    constructor(sip: Sip) {
        super(sip, null);
    }

    public doExecute(repo: SipRepository): Observable<void> {
        return repo.delete(this.sipBefore);
    }
}
