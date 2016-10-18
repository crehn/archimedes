import { Observable } from 'rxjs/Observable';

import { Sip } from './sip';

export interface SipRepository {
    create(sip: Sip): Observable<void>;
    update(sip: Sip): Observable<void>;
    delete(sip: Sip): Observable<void>;
}
