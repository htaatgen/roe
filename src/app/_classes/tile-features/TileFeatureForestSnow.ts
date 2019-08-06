import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Lumber} from "../resources/Lumber";
import {Furs} from "../resources/Furs";

export class TileFeatureForestSnow extends TileFeature {
    constructor(tile: Tile) {
        super(tile, 50, 0, 0,'forest_snow_',3);
        this.name = 'Snow Pine Forest';
       this.addedTravellingTime = 0.8;
       this.resources.push(new Lumber());

       if(Math.random() > 0.95) {
           this.resources.push(new Furs());
       }
    }
}