import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {EmpiresComponent} from "./empires/empires.component";
import {MapService} from "../_services/map.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public dialog: MatDialog, public map: MapService) {
    }

    ngOnInit() {
    }

    openEmpire(): void {
        this.dialog.open(EmpiresComponent, {
            height: '400px',
            width: '600px'
        });
    }

    save() {
        const save = {
            map: JSON.stringify(this.map.tiles.map(tile => tile.toJson()))
        }
        console.log(save);
    }

}
