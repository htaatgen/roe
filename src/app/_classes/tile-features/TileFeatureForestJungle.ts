import {TileFeature} from "../TileFeature";
import {Tile} from "../Tile";
import {HardwoodLumber} from "../resources/HardwoodLumber";
import {TropicalFruit} from "../resources/TropicalFruit";
import {Coffee} from "../resources/Coffee";
import {Cacao} from "../resources/Cacao";
import {RarePelts} from "../resources/RarePelts";

export class TileFeatureForestJungle extends TileFeature {
    constructor(tile: Tile) {
        super(tile);
        this.image = ['features', 'forest_jungle_' + Math.ceil(Math.random() * 1)];
        this.renderPass = 1;
        this.name = 'Jungle';
        this.addedTravellingTime = 0.6;
        this.resources.push(new HardwoodLumber());

        if (Math.random() > 0.8) {
            this.resources.push(new HardwoodLumber());
        }
        if (Math.random() > 0.7) {
            this.resources.push(new TropicalFruit());
        }
        if (Math.random() > 0.9) {
            this.resources.push(new Coffee());
        }
        if (Math.random() > 0.9) {
            this.resources.push(new Cacao());
        }
        if (Math.random() > 0.9) {
            this.resources.push(new RarePelts());
        }
    }
}