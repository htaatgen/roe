export class UnitStats {
    attack: number;
    defence: number;
    charge: number;
    range: number;
    size: number;
    maxSize: number;
    upkeep: number;
    requires: string[] = [];

    constructor(attack = 3, defence = 3, charge = 3, range = 1, size = 100, upkeep = 10, requires = []) {
        this.attack = attack;
        this.defence = defence;
        this.charge = charge;
        this.range = range;
        this.size = size;
        this.maxSize = size;
        this.upkeep = upkeep;
        this.requires = requires;
    }
}