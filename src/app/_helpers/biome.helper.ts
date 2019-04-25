import {Tile} from "../_classes/Tile";

export class BiomeHelper {
    static createBiomeName(tile: Tile) {
        if (tile !== null) {
            let temp;
            if (tile.temperature > -1) {
                temp = 'Hot';
            } else if (tile.temperature > -2) {
                temp = 'Warm';
            } else if (tile.temperature > -3) {
                temp = 'Temperate';
            } else if (tile.temperature > -4) {
                temp = 'Cold';
            } else {
                temp = 'Freezing';
            }
            return temp + ' '+ tile.biome;
        }
        return '';
    }
}