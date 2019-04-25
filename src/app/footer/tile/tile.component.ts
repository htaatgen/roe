import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {Tile} from "../../_classes/Tile";
import {MapService} from "../../_services/map.service";
import {GraphicsService} from "../../_services/graphics.service";
import {SelectionService} from "../../_services/selection.service";
import {BiomeHelper} from "../../_helpers/biome.helper";

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
            this.selectedTileDescription = BiomeHelper.createBiomeName(this.selectedTile);
        });
    }
}
