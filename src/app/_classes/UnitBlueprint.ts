import {UnitAttribute} from "./UnitAttribute";
import {Unit} from "./Unit";
import {Tile} from "./Tile";

export class UnitBlueprint {
    name: string;
    image = ['units', 'melee_1_1'];
    attributes: UnitAttribute[] = [];
    originTile: Tile;

    constructor(originTile, name = '', attributes = []) {
        this.name = name;
        this.attributes = attributes;
        this.originTile = originTile
    }

    spawn(owningArmy) {
        return new Unit(this.name, this.attributes, this.image, this.originTile, owningArmy);
    }

    getRecruitingTime():number{
        let recruitingTime = 2000;
        this.attributes.forEach(attribute=>recruitingTime+= attribute.stats.recruitingTime);
        return recruitingTime;
    }

    getRecruitingCost():number{
        let recruitingCost = 500;
        this.attributes.forEach(attribute=>recruitingCost+= attribute.stats.cost);
        return recruitingCost;
    }
}