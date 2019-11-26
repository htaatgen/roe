import {TileFeature} from "../TileFeature";
import {Tile} from "../Tile";
import {Grain} from "../resources/Grain";

export class TileFeatureGrain extends TileFeature {
    constructor(tile: Tile) {
        super(tile, 50, 1, 0, 'grain_', 3);
        this.name = 'Grain';
        this.addedTravellingTime = 0.6;
        this.resources.push(new Grain());

    }
}