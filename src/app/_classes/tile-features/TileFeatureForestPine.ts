import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Lumber} from "../resources/Lumber";
import {Furs} from "../resources/Furs";

export class TileFeatureForestPine extends TileFeature {
    constructor(tile: Tile) {
        super(tile, 40, 0, 0, 'forest_pine_', 3);
        this.name = 'Pine Forest';
       this.addedTravellingTime = 0.8;
       this.resources.push(new Lumber());

       if(Math.random() > 0.8) {
           this.resources.push(new Lumber());
       }
       if(Math.random() > 0.9) {
           this.resources.push(new Furs());
       }
    }
}