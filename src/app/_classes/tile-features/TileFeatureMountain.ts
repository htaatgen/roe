import {TileFeature} from "../TileFeature";
import {Resource} from "../Resource";
import {Tile} from "../Tile";
import {Stone} from "../resources/Stone";
import {Iron} from "../resources/Iron";
import {Copper} from "../resources/Copper";
import {Gold} from "../resources/Gold";
import {Silver} from "../resources/Silver";
import {Gemstones} from "../resources/Gemstones";

export class TileFeatureMountain extends TileFeature {
    constructor(tile: Tile) {
        super(tile, 5, 1, 0, 'mountain_' , 2);
        this.name = 'Mountains';
        this.category = 'Mountains';
        this.addedTravellingTime = 0.75;
        this.resources.push(new Stone());

        if (Math.random() > 0.9) {
            this.resources.push(new Iron());
        }
        if (Math.random() > 0.8) {
            this.resources.push(new Copper());
        }
        if (Math.random() > 0.95) {
            this.resources.push(new Gold());
        }
        if (Math.random() > 0.95) {
            this.resources.push(new Silver());
        }
        if (Math.random() > 0.95) {
            this.resources.push(new Gemstones());
        }
    }
}