import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {GraphicsService} from "../../_services/graphics.service";
import {UnitBlueprint} from "../../_classes/UnitBlueprint";
import {ModalNewUnitComponent} from "../modal-new-unit/modal-new-unit.component";
import {MatDialog} from "@angular/material";
import {Army} from "../../_classes/Army";
import {InputService} from "../../_services/input.service";
import {SelectionService} from "../../_services/selection.service";

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.css']
})
export class UnitComponent {
    public units: UnitBlueprint[];

    constructor(public view: ViewService,
                public gfx: GraphicsService,
                private dialog: MatDialog,
                private input: InputService,
                private selection: SelectionService)
    {
        this.selection.settlement.subscribe(() => {
            this.getUnitsOfSettlement();
        })
    }

    getUnitsOfSettlement() {
        this.units = [];
        if (this.selection.settlementSelected()) {
            this.selection.settlement.value.populations.forEach(population => {
                population.units.forEach(unitBlueprint => {
                    this.units.push(unitBlueprint);
                });
            });
        }
    }

    buildUnit(unitBlueprint) {
        if (!this.selection.armySelected()) {
            this.selection.tile.value.armies.push(new Army(this.selection.tile.value));
            this.input.selectArmy(this.selection.tile.value.armies[this.selection.tile.value.armies.length-1]);
        }
        this.selection.army.value.units.push(unitBlueprint.spawn(this.selection.army.value))
    }

    openNewUnit(): void {
        this.dialog.open(ModalNewUnitComponent, {
            height: '400px',
            width: '600px',
            panelClass: 'modal'
        });
    }

}
