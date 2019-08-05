import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {GraphicsService} from "../../_services/graphics.service";
import {Army} from "../../_classes/Army";
import {Tile} from "../../_classes/Tile";
import {InputService} from "../../_services/input.service";
import {isNullOrUndefined} from "util";
import {SelectionService} from "../../_services/selection.service";
import {PlayerService} from "../../_services/player.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-army',
    templateUrl: './army.component.html',
    styleUrls: ['./army.component.css']
})
export class ArmyComponent {

    constructor(public view: ViewService, public gfx: GraphicsService, public input: InputService, public selection: SelectionService, public sanitizer: DomSanitizer) {
    }

    // selectUnit(unit, index) {
    //     const selectedUnitIndex = this.selectedUnits.units.findIndex(selectedUnit => selectedUnit.id === unit.id);
    //     if (selectedUnitIndex === -1) {
    //         this.selectedTile.units.splice(index, 1);
    //         this.selectedUnits.units.push(unit);
    //     } else {
    //         this.selectedUnits.units.splice(selectedUnitIndex, 1);
    //         this.selectedTile.units.push(unit);
    //     }
    // }

    createArmy() {
        this.selection.tile.value.armies.push(new Army(this.selection.tile.value));
        this.input.selectArmy(this.selection.tile.value.armies[this.selection.tile.value.armies.length - 1])
    }

    selectArmy(army) {
        if (this.selection.armySelected() && army.id == this.selection.army.value.id) {
            this.input.unSelectArmy()
        } else {
            this.input.selectArmy(army)
        }
    }

    unselectSelectedUnits() {
    }


}
