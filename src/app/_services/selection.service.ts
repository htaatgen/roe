import {Injectable} from '@angular/core';
import {Army} from "../_classes/Army";
import {Tile} from "../_classes/Tile";
import {TileFeatureSettlement} from "../_classes/tile-features/TileFeatureSettlement";
import {BehaviorSubject} from "rxjs";
import {isNullOrUndefined} from "util";

@Injectable({
    providedIn: 'root'
})
export class SelectionService {
    army = new BehaviorSubject<Army>(null);
    tile = new BehaviorSubject<Tile>(null);
    settlement = new BehaviorSubject<TileFeatureSettlement>(null);

    constructor() {
        this.tile.subscribe(tile => !isNullOrUndefined(tile) ? this.settlement.next(tile.getSettlement()): null)
    }

    tileSelected() {
        return !isNullOrUndefined(this.tile.value)
    }

    settlementSelected() {
        return !isNullOrUndefined(this.settlement.value)
    }

    armySelected() {
        return !isNullOrUndefined(this.army.value)
    }
}
