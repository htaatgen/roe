import {UnitAttribute} from "./UnitAttribute";
import {Unit} from "./Unit";
import {Tile} from "./Tile";

export class UnitBlueprint {
    name: string;
    image = ['units', 'melee_1_1'];
    attributes: UnitAttribute[] = [];
    originTile:Tile;

    constructor(originTile, name = '', attributes = []) {
        this.name = name;
        this.attributes = attributes;
        this.originTile = originTile
    }

    spawn(owningArmy){
        return new Unit(this.name, this.attributes, this.image, this.originTile, owningArmy);
    }
}