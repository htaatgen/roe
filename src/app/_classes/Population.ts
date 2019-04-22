import {Technology} from "./Technology";
import {TileFeatureSettlement} from "./tile-features/TileFeatureSettlement";
import {UnitBlueprint} from "./UnitBlueprint";

export class Population {
    name: string;
    homeSettlement: TileFeatureSettlement;
    type: string;
    militarySkill: number;
    administrativeSkill: number;
    economicSkill: number;
    units: UnitBlueprint[] = [];
    technologies: Technology[] = [];

    constructor(homeSettlement: TileFeatureSettlement, type = 'tribal', militarySkill = 0, administrativeSkill = 0, economicSkill = 0) {
        this.homeSettlement = homeSettlement;
        this.name = homeSettlement.nameMultiple;
        this.type = type;
        this.militarySkill = militarySkill;
        this.administrativeSkill = administrativeSkill;
        this.economicSkill = economicSkill;

        this.units.push(new UnitBlueprint(homeSettlement,homeSettlement.nameSingular + ' Warriors', []))
    }
}