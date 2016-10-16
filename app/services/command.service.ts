import { Injectable } from '@angular/core';

import { Command } from '../models/command';
import { SipCache } from './sip-cache.service';

@Injectable()
export class CommandService {
    private commands: Command[];

    constructor(private repo: SipCache) {
    }

    public execute(command: Command) {
        this.commands.push(command);
        command.execute(this.repo);
    }

    public isInSync(): boolean {
        return this.commands.every(command => command.isExecuted);
    }

    public resync() {
        this.commands
            .filter(command => !command.isExecuted)
            .forEach(command => command.execute(this.repo));
    }
}
