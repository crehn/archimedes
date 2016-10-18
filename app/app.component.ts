import { Component, OnInit, ViewChild } from '@angular/core';

import { Sip } from './models/sip';
import { SipCache } from './services/sip-cache.service';
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
        z-index: 9999;
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
        <arch-query-input (onSubmitted)="updateQuery($event)" value="+foo"></arch-query-input>
    </div>
    <div class="row">
        <arch-alerts class="alerts-fixed col-md-10 col-md-offset-1"></arch-alerts>
    </div>
    <arch-kanban></arch-kanban>
</div>
    `
})
export class AppComponent implements OnInit {
    @ViewChild(AlertsComponent)
    private alerts: AlertsComponent;

    constructor(private repo: SipCache) {
    }

    ngOnInit() {
        this.repo.sipsChanged.subscribe(
            (sips: Sip[]): void => { },
            (errorMessage: string) => this.showError(errorMessage)
        );
    }

    public updateQuery(query: string) {
        this.repo.queryString = query;
    }

    private showError(errorMessage: string) {
        this.alerts.add(AlertType.danger, errorMessage);
    }
}
