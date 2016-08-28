import { Sip } from '../models/sip';

export class SipGateway {
    public querySips(query: string): Sip[] {
        return [
            new Sip({ title: 'foo' }),
            new Sip({ title: 'bar' }),
        ];
    }
}
