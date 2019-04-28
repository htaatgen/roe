import {Injectable} from '@angular/core';
import {Tile} from "../_classes/Tile";
import {GenesisHelper} from "../_helpers/genesis.helper";
import {Empire} from "../_classes/Empire";
import {isNullOrUndefined} from "util";

@Injectable({
    providedIn: 'root'
})
export class MapService {
    public tiles: Array<Tile>;
    public empires: Empire[] = [];
    public size: { height: number, width: number };

    constructor() {
    }

    initMap(height: number, width: number) {
        this.size = {height: height, width: width};
        this.tiles = GenesisHelper.create(height, width);
        this.tiles.forEach(tile => {
            if (tile.owningEmpire !== null) {
                this.addEmpire(tile.owningEmpire);
            }
        })
    }

    findTileByCoordinates(x, y) {
        return this.tiles.find(tile => tile.x === x && tile.y === y)
    }

    addEmpire(newEmpire: Empire) {
        if (this.empires.every(empire => empire.name !== newEmpire.name)) {
            this.empires.push(newEmpire)
        }
    }

    getPath(start: Tile, destination: Tile) {
        if(isNullOrUndefined(destination)){
            return null;
        }

        let paths = [];
        let finalPath: any = false;

        start.eachNeighbour(neighbour => {
            if (this.equalTile(neighbour, destination)) {
                finalPath = {
                    0: start,
                    1: destination,
                    distance: start.travellingTime + destination.travellingTime,
                    last: 1
                }
            } else {
                paths.push({
                    0: start,
                    1: neighbour,
                    distance: start.travellingTime + neighbour.travellingTime,
                    last: 1,
                    finished: false
                });
                neighbour.visited = true;
            }
        });
        if (finalPath) {
            return finalPath;
        }

        let travelSteps = 1;
        let shortestDistance = 0;
        while (paths.length !== 0 && !paths.every(path => path.finished) && travelSteps < 200) {
            let newPaths = [];
            paths.forEach(path => {
                if (!path.finished) {
                    path[travelSteps].eachNeighbour(n1 => {
                        if (!n1.visited) {
                            let newPath = Object.assign({}, path);
                            newPath[travelSteps + 1] = n1;
                            newPath.last = travelSteps + 1;
                            newPath.finished = this.equalTile(n1, destination);
                            newPaths.push(newPath);
                        }
                    })
                } else {
                    newPaths.push(path);
                }
            });

            travelSteps++;
            let i = newPaths.length;
            while (i--) {
                let i2 = newPaths.length;
                if (newPaths[i].last < travelSteps && !newPaths[i].finished) {
                    newPaths.splice(i, 1);
                    continue;
                }
                while (i2--) {
                    if (newPaths[i] !== undefined && newPaths[i2] !== undefined &&
                        this.equalTile(newPaths[i][newPaths[i].last], newPaths[i2][newPaths[i2].last])
                        && newPaths[i].distance >= newPaths[i2].distance
                        && i != i2) {
                        newPaths.splice(i, 1);
                    }
                }
            }

            newPaths.forEach(path => {
                if (path.last === travelSteps) {
                    path[path.last].visited += 1;
                    path.distance += path[path.last].travellingTime;
                }
                if (path.finished) {
                    if (shortestDistance === 0 || path.distance < shortestDistance) {
                        shortestDistance = path.distance;
                    }
                }
            });

            if (shortestDistance !== 0) {
                newPaths = newPaths.filter(path => path.distance <= shortestDistance);
            }
            paths = newPaths;
        }
        this.tiles.forEach(tile => tile.visited = false);
        return paths[0];
    }

    private equalTile(tile1, tile2) {
        return tile1.x === tile2.x && tile1.y === tile2.y;
    }
}
