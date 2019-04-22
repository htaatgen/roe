import {Component} from '@angular/core';
import {ViewService} from "../../_services/view.service";
import {Tile} from "../../_classes/Tile";
import {TileFeatureSettlement} from "../../_classes/tile-features/TileFeatureSettlement";
import {isNullOrUndefined} from "util";
import {SelectionService} from "../../_services/selection.service";
import {ModalNewUnitComponent} from "../modal-new-unit/modal-new-unit.component";
import {MatDialog} from "@angular/material";
import {ModalTechtreeComponent} from "../modal-techtree/modal-techtree.component";

@Component({
    selector: 'app-settlement',
    templateUrl: './settlement.component.html',
    styleUrls: ['./settlement.component.css']
})
export class SettlementComponent{

    constructor(public view: ViewService, public selection:SelectionService,
                private dialog: MatDialog) {
    }

    openTechtree(): void {
        this.dialog.open(ModalTechtreeComponent, {
            height: '400px',
            width: '600px',
            panelClass: 'modal'
        });
    }

}
