import {Tile} from "./Tile";
import {Army} from "./Army";

export class Path {
    path: Tile[] = [];

    distanceToNextTile: number;
    progressToNextTile: number = 0;
    tileCount: number = 0;
    completed = false;
    lastTime: number;
    army: Army;
    render = [];

    constructor(path, army) {
        this.lastTime = window.performance.now();
        this.distanceToNextTile = this.distance(path[0], path[1]);
        this.army = army;

        for(let i = 0; i <= path.last; i++) {
            this.path.push(path[i]);
            if(path[i+1] !== undefined ) {
                this.render.push({
                    from: {x: path[i].x + 1, y: path[i].y},
                    to: {x: path[i + 1].x + 1, y: path[i + 1].y},
                    done: false,
                    progress: 0
                })
            }
        }
    }

    progress(time:number ) {
        if (!this.completed) {
            this.progressToNextTile += time - this.lastTime;
            this.lastTime = time;
            if(this.render[this.tileCount] !== undefined) {
                let progress = this.progressToNextTile / this.distanceToNextTile;
                this.render[this.tileCount].progress = progress > 1 ? 1 : progress;
            }
            if (this.progressToNextTile > this.distanceToNextTile) {
                if(this.render[this.tileCount] !== undefined) {
                    this.render[this.tileCount].done = true;
                }

                this.tileCount++;
                if (this.path[this.tileCount] == undefined) {
                    this.completed = true;
                } else {
                    this.army.move(this.path[this.tileCount]);

                    this.distanceToNextTile = this.distance(this.path[this.tileCount - 1], this.path[this.tileCount])
                    this.progressToNextTile = 0;
                }

            }

        }
    }

    distance(tile1: Tile, tile2: Tile) {
        return (tile1.travellingTime + tile2.travellingTime)*100
    }

}