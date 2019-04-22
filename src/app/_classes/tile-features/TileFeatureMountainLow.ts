import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Stone} from "../resources/Stone";
import {Iron} from "../resources/Iron";
import {Copper} from "../resources/Copper";
import {Gold} from "../resources/Gold";
import {Silver} from "../resources/Silver";
import {Gemstones} from "../resources/Gemstones";

export class TileFeatureMountainLow extends TileFeature {
    constructor(tile: Tile) {
        super(tile);
        this.image = ['features', 'mountain_low_' + Math.ceil(Math.random() * 2)];
        this.renderPass = 2;
        this.name = 'Low Mountains';
       this.addedTravellingTime = 0.5;
       this.resources.push(new Stone());

       if(Math.random() > 0.9) {
           this.resources.push(new Iron());
       }
       if(Math.random() > 0.8) {
           this.resources.push(new Copper());
       }
       if(Math.random() > 0.95) {
           this.resources.push(new Gold());
       }
       if(Math.random() > 0.95) {
           this.resources.push(new Silver());
       }
       if(Math.random() > 0.95) {
           this.resources.push(new Gemstones());
       }
    }
}