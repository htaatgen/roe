import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameParameters} from "../_interfaces/GameParameters";

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
    @Output() gameStart = new EventEmitter<GameParameters>();
    size: number = 50;
    tab:string = null;

    constructor() {
    }

    ngOnInit() {
    }

    newGame() {
        let parameters: GameParameters = {
            new: true,
            x: this.size,
            y: this.size
        };
        this.gameStart.emit(parameters);
    }

    loadGame() {
        let parameters: GameParameters = {
            new: true,
            x: this.size,
            y: this.size
        };
        this.gameStart.emit(parameters);
    }

    parseAsInt(value) {
        console.log(value);
        return parseInt(value);
    }
}
