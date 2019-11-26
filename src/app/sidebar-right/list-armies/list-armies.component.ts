import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../_services/player.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ViewService} from "../../_services/view.service";
import {InputService} from "../../_services/input.service";

@Component({
    selector: 'app-list-armies',
    templateUrl: './list-armies.component.html',
    styleUrls: ['./list-armies.component.css']
})
export class ListArmiesComponent implements OnInit {

    constructor(public player: PlayerService, public sanitizer: DomSanitizer, public view: ViewService, public input: InputService) {
    }

    ngOnInit() {
    }

    clickArmy(army) {
        this.input.selectArmy(army);
        this.view.set(army.location.x, army.location.y);
    }

}
