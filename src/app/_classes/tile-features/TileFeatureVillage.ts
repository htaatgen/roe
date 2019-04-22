import {TileFeature} from "../TileFeature";
import {NameHelper} from "../../_helpers/name.helper";
import {Tile} from "../Tile";

export class TileFeatureVillage extends TileFeature {
    lexicon: any = {};
    nameBase: string;
    nameRoot: string;
    nameSingular: string;
    nameMultiple: string;

    constructor(tile: Tile) {
        super(tile);
        this.image = ['features', 'village_' + Math.ceil(Math.random() * 2)];
        this.renderPass = 2;
        this.name = 'Village';
        this.lexicon = NameHelper.generateLexicon();
        this.nameBase = NameHelper.generateName(this.lexicon);
        this.nameRoot = this.nameBase + this.lexicon.suffix.root;
        this.nameSingular = this.nameBase + this.lexicon.suffix.singular;
        this.nameMultiple = this.nameBase + this.lexicon.suffix.multiple;
        this.addedTravellingTime = 1.1;
    }
}