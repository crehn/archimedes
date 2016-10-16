import { Observable } from 'rxjs/Observable';

import { QueryResult, Sip } from './sip';

export interface SipRepository {
    create(sip: Sip): Observable<void>;
    query(query: string): Observable<QueryResult>;
    update(sip: Sip): Observable<void>;
    delete(sip: Sip): Observable<void>;
}
