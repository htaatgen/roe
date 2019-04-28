import {Component} from '@angular/core';
import {MapService} from "../_services/map.service";
import {PlayerService} from "../_services/player.service";
import {SelectionService} from "../_services/selection.service";
import {BiomeHelper} from "../_helpers/biome.helper";
import {MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-modal-new-game',
    templateUrl: './modal-new-game.component.html',
    styleUrls: ['./modal-new-game.component.css']
})
export class ModalNewGameComponent {

    constructor(public map: MapService, public player: PlayerService, public dialogRef: MatDialogRef<ModalNewGameComponent>) {
    }

    createBiomeName(tile) {
        return BiomeHelper.createBiomeName(tile);
    }

    setEmpire(id){
        this.player.empire = this.map.empires.find(empire=> empire.id == id);
    }

}
