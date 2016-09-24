import { Component } from '@angular/core';

import { Alert, AlertType } from './alert';

@Component({
    selector: 'arch-alerts',
    template: `
    <alert *ngFor="let alert of alerts; let i = index"
            [type]="toString(alert.type)" dismissible="true" dismissOnTimeout="10000" (close)="closeAlert(i)">
        {{ alert?.msg }}
    </alert>
    `
})
export class AlertsComponent {
    alerts: Alert[] = [];

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    public add(alert: Alert): void;
    public add(type: AlertType, message: string): void;

    add(typeOrAlert: AlertType | Alert, message?: string): void {
        if (typeOrAlert instanceof Alert)
            this.alerts.push(typeOrAlert);
        else
            this.alerts.push(new Alert(typeOrAlert, message));
    }

    public toString(type: AlertType): string {
        return AlertType[type];
    }
}
