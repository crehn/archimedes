import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'arch-query-input',
    styles: [`
#query-input {
    width:90%;
    margin:1rem;
}
    `],
    template: `
<label for="query-input">Query:</label>
<input type="text" #query id="query-input" autofocus (keyup.enter)="submit(query.value)">
<input type="button" value="go" (click)="submit(query.value)">
    `
})
export class QueryInputComponent {
    @Output() onSubmitted = new EventEmitter();

    public submit(value: string) {
        this.onSubmitted.emit(value);
    }
}
