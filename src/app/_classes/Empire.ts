import {TileFeatureSettlement} from "./tile-features/TileFeatureSettlement";
import {Tile} from "./Tile";
import {Army} from "./Army";
import {Lexicon} from "./Lexicon";
import {ColourHelper} from "../_helpers/colour.helper";
import {UnitBlueprint} from "./UnitBlueprint";
import {TechItem} from "../_interfaces/TechItem";

export class Empire {
    id: number;
    capital: TileFeatureSettlement;
    ownedSettlements: TileFeatureSettlement[] = [];
    territory: Tile[] = [];

    armies: Army[] = [];
    units: UnitBlueprint[] = [];
    techtree: TechItem[] = [];

    lexicon: Lexicon;

    name: string;
    colour: string;
    textColour: string;

    constructor(capital: TileFeatureSettlement) {
        this.id = window.performance.now();
        this.capital = capital;
        this.capital.tile.owningEmpire = this;
        this.lexicon = this.capital.lexicon;
        this.name = this.capital.nameMultiple;

        this.colour = ColourHelper.createColour();
        this.textColour = ColourHelper.getContrastColour(this.colour);
        this.territory.push(this.capital.tile);
        this.ownedSettlements.push(this.capital);
    }

    destroy(){

    }
}