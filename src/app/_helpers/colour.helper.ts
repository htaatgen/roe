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

    static getContrastColour(rgb) {
        let r = parseInt(rgb.substring(1, 3), 16);
        let g = parseInt(rgb.substring(3, 5), 16);
        let b = parseInt(rgb.substring(5), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? '#000000' : '#ffffff';
    }
}