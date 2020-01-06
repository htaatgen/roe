import {TileFeature} from "../TileFeature";
import {NameHelper} from "../../_helpers/name.helper";
import {Resource} from "../Resource";
import {Population} from "../Population";
import {Empire} from "../Empire";
import {Tile} from "../Tile";
import {TechItem} from "../../_interfaces/TechItem";

export class TileFeatureSettlement extends TileFeature {
    lexicon: any = {};
    nameBase: string;
    nameRoot: string;
    nameSingular: string;
    nameMultiple: string;

    settlementLevel = 1;
    population: Population;

    constructor(tile: Tile, empire: Empire = null, population: Population = null) {
        super(tile, 1, 5, 0.2, 'settlement_1_', 2);
        this.name = 'Settlement';
        this.category = 'Settlement';
        this.lexicon = NameHelper.generateLexicon();
        this.nameBase = NameHelper.generateName(this.lexicon);
        this.nameRoot = this.nameBase + this.lexicon.suffix.root;
        this.nameSingular = this.nameBase + this.lexicon.suffix.singular;
        this.nameMultiple = this.nameBase + this.lexicon.suffix.multiple;
        this.addedTravellingTime = 1.1;

        if (population == null) {
            population = new Population(this, 'tribal', 0, 0, 0)
        }
        this.population = population;

        if (empire == null) {
            empire = new Empire(this);
        }
        this.tile.owningEmpire = empire;
    }
}