import {Injectable} from '@angular/core';
import {Empire} from "../_classes/Empire";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    empire: Empire;

    constructor() {
    }

    startGame() {
        this.empire.capital.tile.discovered = true;
        this.empire.capital.tile.eachNeighbour(neighbour => neighbour.discovered = true);
    }
}
