import {UnitStats} from "./UnitStats";

export class UnitAttribute {
    name: string;
    type: string;
    stats: UnitStats;

    public constructor(name, type, stats: UnitStats) {
        this.name = name;
        this.type = type;
        this.stats = stats;
    }
}