import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {GraphicsService} from "../../_services/graphics.service";
import {InputService} from "../../_services/input.service";
import {SelectionService} from "../../_services/selection.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Army} from "../../_classes/Army";

@Component({
    selector: 'app-tile-armies',
    templateUrl: './tile-armies.component.html',
    styleUrls: ['./tile-armies.component.css']
})
export class TileArmiesComponent {

    constructor(public view: ViewService, public gfx: GraphicsService, public input: InputService, public selection: SelectionService, public sanitizer: DomSanitizer) {
    }

    createArmy() {
        if (this.selection.tile.value.armies.every(army => army.units.length > 0)) {
            this.selection.tile.value.armies.push(new Army(this.selection.tile.value));
            this.input.selectArmy(this.selection.tile.value.armies[this.selection.tile.value.armies.length - 1])
        }
    }

    selectArmy(army) {
        if (this.selection.armySelected() && army.id == this.selection.army.value.id) {
            this.input.unSelectArmy()
        } else {
            this.input.selectArmy(army)
        }
    }
}
