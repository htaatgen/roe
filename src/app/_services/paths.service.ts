import {Injectable} from '@angular/core';
import {Path} from "../_classes/Path";

@Injectable({
    providedIn: 'root'
})
export class PathsService {
    public paths: Path[] = [];

    constructor() {
    }

    startPathsUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.paths.forEach(
                (path, key) => {
                    if(path.completed || path.army.units.length == 0){
                        this.paths.splice(key, 1);
                    } else {
                        path.progress(time);
                    }
                })
        })
    }
}
