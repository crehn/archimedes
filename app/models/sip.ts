export class Sip {
    guid: string;
    title: string;
    notes: string;
    text: string;
    sourceUri: string;
    tags: string[];

    status: string;

    originTimestamp: string;
    created: string;
    modified: string;
    due: string;

    constructor(template: any) {
        for (let field in template) {
            if (template.hasOwnProperty(field)) {
                this[field] = template[field];
            }
        }
    }
}

export class QueryResult {
    constructor(public sips: Sip[], public errorMessage?: string) {
    }
}
