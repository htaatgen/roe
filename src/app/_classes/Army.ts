import {Unit} from "./Unit";
import {Tile} from "./Tile";
import {Empire} from "./Empire";

export class Army {
    id: number;
    units: Unit[] = [];
    location: Tile;
    owningEmpire: Empire;

    constructor(location: Tile) {
        this.location = location;
        this.id = window.performance.now();
        this.owningEmpire = location.owningEmpire;
    }

    move(newLocation: Tile) {
        this.location.armies.splice(this.location.armies.findIndex(army => army.id === this.id), 1);
        this.location = newLocation;
        this.location.armies.push(this);
    }

    getCommandedUnits() {
        return this.units;
    }

    destroy() {
        this.owningEmpire.armies.splice(this.owningEmpire.armies.findIndex(army => army.id === this.id), 1);
        this.location.armies.splice(this.location.armies.findIndex(army => army.id === this.id), 1);
    }
}