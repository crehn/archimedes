import { Component } from '@angular/core';

import { Sip } from './models/sip';
import { SipGateway } from './services/sip-gateway.service';

@Component({
    selector: 'arch-app',
    template: `
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
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

<div class="container">
    <arch-query-input (onSubmitted)="updateSips($event)"></arch-query-input>
    <arch-kanban [sips]="sips"></arch-kanban>
</div>
    `
})
export class AppComponent {
    private sips: Sip[];

    constructor(private sipGateway: SipGateway) {
    }

    public updateSips(query: string) {
        this.sips = this.sipGateway.querySips(query);
        console.log(this.sips);
    }
}
