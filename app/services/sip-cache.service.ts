import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QueryResult, Sip } from '../models/sip';
import { SipRepository } from '../models/sip-repository';
import { SipGateway } from './sip-gateway.service';

@Injectable()
export class SipCache implements SipRepository {
    private sips: Map<string, Sip> = new Map<string, Sip>();

    constructor(private gateway: SipGateway) {
    }

    public create(sip: Sip): Observable<void> {
        sip.guid = this.newGuid();
        this.sips[sip.guid] = sip;
        return this.gateway.create(sip);
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

    public query(query: string): Observable<QueryResult> {
        const observable = this.gateway.query(query);
        observable.subscribe(
            result => this.merge(result.sips),
            errorMessage => this.queryLocally(query, errorMessage));
        return observable;
    }

    private merge(sips: Sip[]) {
        sips.forEach(sip => this.sips[sip.guid] = sip);
    }

    private queryLocally(query: string, errorMessage: string): Observable<Sip[]> {
        // TODO: query locally
        return null; // new QueryResult([], errorMessage);
    }

    public update(sip: Sip): Observable<void> {
        this.sips[sip.guid] = sip;
        return this.gateway.update(sip);
    }

    public delete(sip: Sip): Observable<void> {
        this.sips.delete(sip.guid);
        return this.gateway.delete(sip);
    }
}
