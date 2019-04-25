import {Injectable} from '@angular/core';
import {Path} from "../_classes/Path";
import {PlayerService} from "./player.service";

@Injectable({
    providedIn: 'root'
})
export class PathsService {
    public paths: Path[] = [];

    constructor(private player: PlayerService) {
    }

    startPathsUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.paths.forEach(
                (path, key) => {
                    if(path.army.owningEmpire.id === this.player.empire.id){
                        path.army.location.discovered = true;
                        path.army.location.eachNeighbour(neighbour => neighbour.discovered = true);
                    }
                    if(path.completed || path.army.units.length == 0){
                        this.paths.splice(key, 1);
                    } else {
                        path.progress(time);
                    }
                })
        })
    }
}
