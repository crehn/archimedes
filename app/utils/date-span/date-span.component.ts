import { Component, Input } from '@angular/core';

@Component({
    selector: 'arch-date-span',
    template: `
    <span>{{format(value)}}</span>
    `
})
export class DateSpanComponent {
    @Input() value: string;

    format(value: string): string {
        if (!value)
            return '';

        let date = new Date(value);
        return date.getFullYear()
            + '-' + this.pad(date.getMonth() + 1)
            + '-' + this.pad(date.getDate())
            + ' ' + this.pad(date.getHours())
            + ':' + this.pad(date.getMinutes())
            + ':' + this.pad(date.getSeconds())
            + ' ' + this.timeZone(date);
    }

    private timeZone(date: Date): string {
        const hourPart = -1 * date.getTimezoneOffset() / 60;
        const minutePart = this.pad(date.getTimezoneOffset() % 60);
        const sign = hourPart >= 0 ? '+' : '-';
        return sign + hourPart + ':' + minutePart;
    }

    private pad(number: number): string {
        return (number < 10) ? '0' + number : number.toString();
    }
}
