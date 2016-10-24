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

    protected abstract doExecute(repo: SipRepository): Observable<void>;

    public abstract inverse(): Command;

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

    public inverse() {
        return new DeleteSipCommand(this.sipAfter);
    }
}

export class UpdateSipCommand extends Command {
    type = CommandType.UPDATE;

    public static change(sip: Sip, setter: (s: Sip) => void) {
        const sipBefore = Object.assign({}, sip);
        const sipAfter = Object.assign({}, sip);
        setter(sipAfter);
        return new UpdateSipCommand(sipBefore, sipAfter);
    }

    public doExecute(repo: SipRepository): Observable<void> {
        return repo.update(this.sipAfter);
    }

    public inverse() {
        return new UpdateSipCommand(this.sipAfter, this.sipBefore);
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

    public inverse() {
        return new CreateSipCommand(this.sipBefore);
    }
}
