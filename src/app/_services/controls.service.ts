import {Injectable} from '@angular/core';
import {ViewService} from "./view.service";

@Injectable({
    providedIn: 'root'
})
export class ControlsService {

    public activeKeys: Array<string> = [];
    public clickLocation: any = {x: 0, y: 0};
    public mouseActive = false;

    constructor(private view:ViewService) {
    }

    isPressed(keycode) {
        return this.activeKeys.includes(keycode);
    }

    press(keycode) {
        if (!this.isPressed(keycode)) {
            this.activeKeys.push(keycode);
        }
    }

    release(keycode) {
        if (this.isPressed(keycode)) {
            this.activeKeys.splice(this.activeKeys.indexOf(keycode), 1);
        }
    }

    mousePress(x, y) {
        if(x < this.view.viewport.width && y < this.view.viewport.height ) {
            this.mouseActive = true;
            this.clickLocation = {x: x, y: y}
        }
    }

    mouseRelease(x, y) {
        this.mouseActive = false;
        this.clickLocation = {x: x, y: y}
    }
}
