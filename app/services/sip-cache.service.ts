import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

import { Sip } from '../models/sip';
import { SipRepository } from '../models/sip-repository';
import { SipGateway } from './sip-gateway.service';

/**
 * 4 steps each:
 *  - update cachedSips
 *  - update sips
 *  - update gui ==> sipsChanged.emit()
 *  - update backend asynchronously
 */
@Injectable()
export class SipCache implements SipRepository {
    private _queryString: string;
    private sips: Sip[] = [];
    private cachedSips: Map<string, Sip> = new Map<string, Sip>();
    public onSipsChanged: Subject<Sip[]> = new Subject();
    public onError: Subject<string> = new Subject();

    constructor(private gateway: SipGateway) {
    }

    public create(sip: Sip): Observable<void> {
        sip.guid = this.newGuid();
        this.cachedSips[sip.guid] = sip;
        this.sips.push(sip);
        this.onSipsChanged.next(this.sips);
        return this.updateBackend(() => this.gateway.create(sip));
    }

    private updateBackend(operation: (() => Observable<void>)) {
        return Observable.create((subscriber: Subscriber<void>) =>
            operation().subscribe(
                result => subscriber.next(result),
                error => this.onError.next(error)
            )
        );
    }

    private newGuid(): string {
        // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now(); // use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            /* tslint:disable */
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            /* tslint:enable */
        });
        return uuid;
    }

    public getSip(guid: string) {
        return this.cachedSips[guid];
    }

    public set queryString(query: string) {
        this._queryString = query;

        this.gateway.query(this._queryString).subscribe(
            result => {
                this.mergeIntoCache(result);
                this.sips = result;
                this.onSipsChanged.next(this.sips);
            },
            error => {
                this.onError.next(error);
                const localSips = this.queryLocally(query);
                this.sips = localSips;
                this.onSipsChanged.next(this.sips);
            });
    }

    private mergeIntoCache(sips: Sip[]) {
        sips.forEach(sip => this.cachedSips[sip.guid] = sip);
    }

    private queryLocally(query: string): Sip[] {
        // TODO: query locally
        return [];
    }

    public update(sip: Sip): Observable<void> {
        this.cachedSips[sip.guid] = sip;
        this.sips.forEach(s => {
            if (s.guid === sip.guid)
                Object.assign(s, sip);
        });
        this.onSipsChanged.next(this.sips);
        return this.updateBackend(() => this.gateway.update(sip));
    }

    public delete(sip: Sip): Observable<void> {
        this.cachedSips.delete(sip.guid);
        this.sips = this.sips.filter(s => s.guid === sip.guid);
        this.onSipsChanged.next(this.sips);
        return this.updateBackend(() => this.gateway.delete(sip));
    }
}
