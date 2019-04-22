import {TileFeature} from "../TileFeature";
import {NameHelper} from "../../_helpers/name.helper";
import {Resource} from "../Resource";
import {Population} from "../Population";
import {Empire} from "../Empire";
import {Tile} from "../Tile";
import {TechItem} from "../../_models/TechItem";

export class TileFeatureSettlement extends TileFeature {
    id: number;
    lexicon: any = {};
    nameBase: string;
    nameRoot: string;
    nameSingular: string;
    nameMultiple: string;
    techtree: TechItem[] = [];

    settlementLevel: number;
    populations: Population[] = [];

    constructor(tile: Tile, empire: Empire = null, population: Population = null) {
        super(tile);
        this.id = window.performance.now();
        this.settlementLevel = 1;
        this.image = ['features', 'settlement_' + this.settlementLevel + '_' + Math.ceil(Math.random() * 2)];
        this.renderPass = 2;
        this.name = 'Settlement';
        this.lexicon = NameHelper.generateLexicon();
        this.nameBase = NameHelper.generateName(this.lexicon);
        this.nameRoot = this.nameBase + this.lexicon.suffix.root;
        this.nameSingular = this.nameBase + this.lexicon.suffix.singular;
        this.nameMultiple = this.nameBase + this.lexicon.suffix.multiple;
        this.addedTravellingTime = 1.1;
        if (population == null) {
            population = new Population(this, 'tribal', 0, 0, 0)
        }
        this.populations.push(population);
        if (empire == null) {
            empire = new Empire(this);
        }
        this.tile.owningEmpire = empire;
    }

    addResource(resource: Resource) {
        this.resources.push(resource);
    }
}