import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../_services/player.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-list-armies',
    templateUrl: './list-armies.component.html',
    styleUrls: ['./list-armies.component.css']
})
export class ListArmiesComponent implements OnInit {

    constructor(public player: PlayerService, public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

}
