import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Stone} from "../resources/Stone";
import {Iron} from "../resources/Iron";
import {Copper} from "../resources/Copper";
import {Gold} from "../resources/Gold";
import {Silver} from "../resources/Silver";
import {Gemstones} from "../resources/Gemstones";

export class TileFeatureMountainPeak extends TileFeature {
    constructor(tile: Tile) {
        super(tile);
        this.image = ['features', 'mountain_peak_' + Math.ceil(Math.random() * 2)];
        this.renderPass = 2;
        this.name = 'Mountain Peaks';
       this.addedTravellingTime = 0.25;

       this.resources.push(new Stone());

       if(Math.random() > 0.8) {
           this.resources.push(new Iron());
       }
       if(Math.random() > 0.7) {
           this.resources.push(new Copper());
       }
       if(Math.random() > 0.90) {
           this.resources.push(new Gold());
       }
       if(Math.random() > 0.90) {
           this.resources.push(new Silver());
       }
       if(Math.random() > 0.90) {
           this.resources.push(new Gemstones());
       }
    }
}