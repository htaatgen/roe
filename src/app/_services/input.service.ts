import {Injectable} from '@angular/core';
import {ControlsService} from "./controls.service";
import {ViewService} from "./view.service";
import {MapService} from "./map.service";
import {isNullOrUndefined} from "util";
import {Path} from "../_classes/Path";
import {PathsService} from "./paths.service";
import {SelectionService} from "./selection.service";

@Injectable({
    providedIn: 'root'
})
export class InputService {

    click = {
        SELECT_TILE: 'selectTile',
        ARMY_MOVE: 'armyMove'
    };

    selectionReleased = true;
    leftClick = this.click.SELECT_TILE;

    constructor(private ctrl: ControlsService,
                private view: ViewService,
                private map: MapService,
                private paths: PathsService,
                private selection: SelectionService) {
    }

    public handle() {
        this.updateMapPosition();

        if (this.ctrl.mouseActive && this.selectionReleased) {
            this.selectionReleased = false;
            switch (this.leftClick) {
                case this.click.SELECT_TILE:
                    this.unSelectArmy();
                    this.tileSelection();
                    break;
                case this.click.ARMY_MOVE:
                    if (this.selection.armySelected() && this.selection.army.value.units.length > 0) {
                        this.paths.cancelArmyMove(this.selection.army.value);
                        this.moveArmy();
                    }
                    break;
            }
        } else if (!this.ctrl.mouseActive) {
            this.selectionReleased = true;
        }
    }

    public selectArmy(army) {
        this.selection.army.next(army);
        this.leftClick = this.click.ARMY_MOVE;
    }

    public unSelectArmy() {
        this.selection.army.next(null);
        this.leftClick = this.click.SELECT_TILE;
    }

    private moveArmy() {
        const location = this.view.toMap(this.ctrl.clickLocation.x, this.ctrl.clickLocation.y);
        const selectedTile = this.map.findTileByCoordinates(Math.round(location.x) - 1, Math.round(location.y));
        let path = this.map.getPath(this.selection.army.value.location, selectedTile);
        if (!isNullOrUndefined(path) && path[0] && path[1]) {
            this.paths.paths.push(new Path(path, this.selection.army.value));
        }
        this.unSelectArmy();
    }

    private updateMapPosition() {
        let x = 0;
        let y = 0;
        if (this.ctrl.isPressed(37)) {
            x += 20;
        }
        if (this.ctrl.isPressed(39)) {
            x -= 20;
        }
        if (this.ctrl.isPressed(38)) {
            y += 10;
        }
        if (this.ctrl.isPressed(40)) {
            y -= 10;
        }
        this.view.update(x, y);
    }

    private tileSelection() {
        const location = this.view.toMap(this.ctrl.clickLocation.x, this.ctrl.clickLocation.y);
        const selectedTile = this.map.findTileByCoordinates(Math.round(location.x) - 1, Math.round(location.y));
        if (!isNullOrUndefined(selectedTile)) {
            if (this.selection.tile.value !== null
                && selectedTile.x == this.selection.tile.value.x
                && selectedTile.y == this.selection.tile.value.y) {
                this.selection.tile.next(null);
            } else {
                this.selection.tile.next(selectedTile);
            }
        }
    }
}
