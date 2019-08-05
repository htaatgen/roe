import {UnitAttribute} from "./UnitAttribute";
import {UnitStats} from "./UnitStats";
import {Tile} from "./Tile";
import {Army} from "./Army";

export class Unit {
    id: number;
    name: string;
    attributes: UnitAttribute[] = [];
    stats: UnitStats;
    image: string[];
    originTile: Tile;
    owningArmy: Army;

    constructor(name, attributes, image, originTile, owningArmy) {
        this.name = name;
        this.attributes = attributes;
        this.updateStats();
        this.image = image;
        this.id = window.performance.now();
        this.originTile = originTile;
        this.owningArmy = owningArmy;
    }

    updateStats() {
        this.stats = new UnitStats();
        this.attributes.forEach(attribute => {
            this.stats.attack += attribute.stats.attack;
            this.stats.defence += attribute.stats.defence;
            this.stats.charge += attribute.stats.charge;
            this.stats.range += attribute.stats.range;
            this.stats.size += attribute.stats.size;
            this.stats.maxSize += attribute.stats.maxSize;
            this.stats.upkeep += attribute.stats.upkeep;
        })
    }

    attack(attack: number) {
        if (!isNaN(attack / this.stats.defence)) {
            this.stats.size -= Math.floor(10 * attack / this.stats.defence);
        }
    }

    destroy() {
        this.owningArmy.units.splice(this.owningArmy.units.findIndex(unit => unit.id === this.id), 1);
        if (this.owningArmy.units.length == 0) {
            this.owningArmy.destroy();
        }
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            attributes: this.attributes,
            image: this.image,
            originTile: {x: this.originTile.x, y: this.originTile.y}
        }
    }
}