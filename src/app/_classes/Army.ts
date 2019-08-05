import {Unit} from "./Unit";
import {Tile} from "./Tile";
import {Empire} from "./Empire";
import {isNullOrUndefined} from "util";
import {ColourHelper} from "../_helpers/colour.helper";

export class Army {
    id: number;
    units: Unit[] = [];
    location: Tile;
    owningEmpire: Empire;
    bannerStyle: string;

    constructor(location: Tile) {
        this.location = location;
        this.id = window.performance.now();
        this.owningEmpire = location.owningEmpire;
        location.owningEmpire.armies.push(this);
        this.bannerStyle = ColourHelper.createBanner(location);
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

    toJson() {
        return {
            id: this.id,
            units: this.units.map(unit => unit.toJson()),
            owningEmpire: isNullOrUndefined(this.owningEmpire) ? null : this.owningEmpire.id,
            banner: isNullOrUndefined(this.owningEmpire) ? null : this.bannerStyle,
        }
    }
}