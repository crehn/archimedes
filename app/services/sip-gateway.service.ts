import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Sip } from '../models/sip';

@Injectable()
export class SipGateway {
    private ENDPOINT = 'http://localhost:8080/rest';

    constructor(private http: Http) {
    }

    public querySips(query: string): Observable<Sip[]> {
        return this.http.get(this.ENDPOINT + '/sips?q=' + encodeURIComponent(query), {
            'headers': new Headers({ 'Accept': 'application/json' })
        })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
