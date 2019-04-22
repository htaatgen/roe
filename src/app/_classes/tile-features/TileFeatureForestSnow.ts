import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Lumber} from "../resources/Lumber";
import {Furs} from "../resources/Furs";

export class TileFeatureForestSnow extends TileFeature {
    constructor(tile: Tile) {
        super(tile);
        this.image = ['features', 'forest_snow_' + Math.ceil(Math.random() * 1)];
        this.renderPass = 1;
        this.name = 'Pine Forest';
       this.addedTravellingTime = 0.8;
       this.resources.push(new Lumber());

       if(Math.random() > 0.95) {
           this.resources.push(new Furs());
       }
    }
}