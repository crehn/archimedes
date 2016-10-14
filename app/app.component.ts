import { Component, ViewChild } from '@angular/core';

import { Sip } from './models/sip';
import { SipGateway } from './services/sip-gateway.service';
import { AlertType } from './utils/alerts/alert';
import { AlertsComponent } from './utils/alerts/alerts.component';

@Component({
    selector: 'arch-app',
    styles: [`
    .query-panel {
        padding: 1rem;
    }
    .alerts-fixed {
        position:fixed;
    }
    `],
    template: `
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" 
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Archimedes</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row query-panel">
        <arch-query-input (onSubmitted)="updateSips($event)" value="+foo"></arch-query-input>
    </div>
    <div class="row">
        <arch-alerts class="alerts-fixed col-xs-11"></arch-alerts>
    </div>
    <arch-kanban [sips]="sips"></arch-kanban>
</div>
    `
})
export class AppComponent {
    private sips: Sip[];

    @ViewChild(AlertsComponent)
    private alerts: AlertsComponent;

    constructor(private sipGateway: SipGateway) {
    }

    public updateSips(query: string) {
        this.sipGateway.querySips(query)
            .subscribe(
            sips => this.sips = sips,
            errorMessage => this.alerts.add(AlertType.danger, errorMessage));
    }
}
