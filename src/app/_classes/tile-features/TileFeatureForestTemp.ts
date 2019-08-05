import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Lumber} from "../resources/Lumber";
import {Fruit} from "../resources/Fruit";
import {Coffee} from "../resources/Coffee";

export class TileFeatureForestTemp extends TileFeature {
    constructor(tile: Tile) {
        super(tile, 40, 0, 0, 'forest_temp_', 3);
        this.name = 'Temperate Forest';
        this.addedTravellingTime = 0.9;
        this.resources.push(new Lumber());

        if (Math.random() > 0.8) {
            this.resources.push(new Lumber());
        }
        if (Math.random() > 0.7) {
            this.resources.push(new Fruit());
        }
        if (Math.random() > 0.9) {
            this.resources.push(new Coffee());
        }
    }
}