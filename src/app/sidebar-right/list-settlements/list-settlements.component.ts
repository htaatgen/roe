import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../_services/player.service";
import {ViewService} from "../../_services/view.service";
import {SelectionService} from "../../_services/selection.service";

@Component({
    selector: 'app-list-settlements',
    templateUrl: './list-settlements.component.html',
    styleUrls: ['./list-settlements.component.css']
})
export class ListSettlementsComponent implements OnInit {

    constructor(public player: PlayerService, public view: ViewService, public selection: SelectionService) {
    }

    ngOnInit() {
    }

    clickSettlement(tile) {
        this.selection.tile.next(tile);
        this.view.set(tile.x, tile.y);
    }
}
