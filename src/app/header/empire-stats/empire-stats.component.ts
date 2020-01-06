import {Component} from '@angular/core';
import {PlayerService} from "../../_services/player.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-empire-stats',
    templateUrl: './empire-stats.component.html',
    styleUrls: ['./empire-stats.component.css']
})
export class EmpireStatsComponent {
    public isNullOrUndefined = isNullOrUndefined;

    constructor(public player: PlayerService) {
    }
}
