import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { QueryResult, Sip } from '../models/sip';
import { SipRepository } from '../models/sip-repository';

@Injectable()
export class SipGateway implements SipRepository {
    private readonly ENDPOINT = 'http://localhost:8080/rest';

    constructor(private http: Http) {
    }

    public create(sip: Sip): Observable<void> {
        return this.http.put(this.sipResource(sip), sip, this.headers({ 'Content-Type': 'application/json' }))
            .catch(this.handleError);
    }

    private sipResource(sip: Sip) {
        return this.ENDPOINT + '/sips/' + sip.guid;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public query(query: string): Observable<QueryResult> {
        const queryResource = this.ENDPOINT + '/sips?q=' + encodeURIComponent(query);
        return this.http.get(queryResource, this.headers({ 'Accept': 'application/json' }))
            .map((response: Response) => new QueryResult(response.json()))
            .catch(this.handleError);
    }

    private headers(headers: any) {
        return {
            'headers': new Headers({
                'Accept': 'application/json'
            })
        };
    }

    public update(sip: Sip): Observable<void> {
        return this.http.put(this.sipResource(sip), sip, this.headers({ 'Content-Type': 'application/json' }))
            .catch(this.handleError);
    }

    public delete(sip: Sip): Observable<void> {
        return this.http.delete(this.sipResource(sip), this.headers({ 'Content-Type': 'application/json' }))
            .catch(this.handleError);
    }
}
