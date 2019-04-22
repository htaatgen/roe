import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {Tile} from "../../_classes/Tile";
import {MapService} from "../../_services/map.service";
import {GraphicsService} from "../../_services/graphics.service";
import {SelectionService} from "../../_services/selection.service";

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.css']
})
export class TileComponent  {
    public selectedTile: Tile;
    public selectedTileDescription: string;

    constructor(public view: ViewService, public map: MapService, public gfx: GraphicsService, public selection:SelectionService) {
        this.selection.tile.subscribe((tile) => {
            this.selectedTile = tile;
            this.selectedTileDescription = this.parseTemperatureAndBiome();
            console.log(this.selectedTile.neighbours);
        });
    }

    parseTemperatureAndBiome() {
        if (this.selectedTile !== null) {
            let temp;
            if (this.selectedTile.temperature > -1) {
                temp = 'Hot';
            } else if (this.selectedTile.temperature > -2) {
                temp = 'Warm';
            } else if (this.selectedTile.temperature > -3) {
                temp = 'Temperate';
            } else if (this.selectedTile.temperature > -4) {
                temp = 'Cold';
            } else {
                temp = 'Freezing';
            }
            return temp + ' '+ this.selectedTile.biome;
        }
        return '';
    }
}
