import {Component} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {EmpiresComponent} from "./modal-empires/empires.component";
import {MapService} from "../_services/map.service";
import {ModalTechtreeComponent} from "./modal-techtree/modal-techtree.component";
import {ModalMenuComponent} from "./modal-menu/modal-menu.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public dialog: MatDialog, public map: MapService) {
    }


    openEmpire(): void {
        this.dialog.open(EmpiresComponent, {
            height: '400px',
            width: '600px'
        });
    }

    openTechtree(): void {
        this.dialog.open(ModalTechtreeComponent, {
            height: '400px',
            width: '600px'
        });
    }

    openMenu(): void {
        this.dialog.open(ModalMenuComponent, {
            height: '400px',
            width: '600px'
        });
    }

}
