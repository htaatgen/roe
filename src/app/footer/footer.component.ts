import {Component} from '@angular/core';
import {ViewService} from "../_services/view.service";
import {MapService} from "../_services/map.service";
import {Tile} from "../_classes/Tile";
import {TileFeatureSettlement} from "../_classes/tile-features/TileFeatureSettlement";
import {isNullOrUndefined} from "util";
import {SelectionService} from "../_services/selection.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public isNullOrUndefined = isNullOrUndefined;

    constructor(public selection: SelectionService, public map: MapService) {
    }
}
