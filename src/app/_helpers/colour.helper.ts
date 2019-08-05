import {Tile} from "../_classes/Tile";

export class ColourHelper {
    static createColour() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    static createBanner(tile: Tile) {
        let baseColour = tile.owningEmpire.colour;
        let contrastColour = this.createColour();

        return "background: repeating-linear-gradient(" + Math.round(Math.random() * 2) * 45 + "deg," +
            baseColour + ", " +
            baseColour + " 10px, " +
            contrastColour + " 10px," +
            contrastColour + " 20px);";
    }
}