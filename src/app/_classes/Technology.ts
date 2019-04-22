export class Technology {
    name: string;
    type: string;
    equipment: string;
    attack: number;
    defence: number;
    charge: number;
    initiative: number;
    range: number;
    upkeep: number;

    public constructor(blueprint){
        this.name = blueprint.name;
        this.type = blueprint.type;
        this.equipment = blueprint.equipment;
        this.attack = blueprint.attack;
        this.defence = blueprint.defence;
        this.charge = blueprint.charge;
        this.initiative = blueprint.initiative;
        this.range = blueprint.range;
        this.upkeep = blueprint.upkeep;
    }
}