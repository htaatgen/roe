import {Tile} from "./Tile";
import {Resource} from "./Resource";

export class TileFeature {
    public name: string;
    public image;
    public x;
    public y;
    public tile: Tile;
    public renderPass = 1;
    public resources: Resource[] = [];
    public addedTravellingTime = 1;

    constructor(tile: Tile) {
        this.x = 0.1 + Math.random()*0.8 + (16/128);
        this.y = -0.4 + Math.random()*0.8 - (16/128);
        if(tile.coast == 'nw'){
            this.x = this.x * 0.7+0.3;
            this.y = this.y * this.x*0.7+0.3
        }
        if(tile.coast == 'ne'){
            this.x = this.x * 0.7;
            this.y = this.y * this.x*0.7+0.3
        }
        if(tile.coast == 'sw'){
            this.x = this.x * 0.7+0.3;
            this.y = this.y * this.x*0.7-0.3
        }
        if(tile.coast == 'se'){
            this.x = this.x * 0.7;
            this.y = this.y * this.x*0.7-0.3
        }

        this.tile = tile;
    }

    public renderOrders() {
        return {x: this.x, y: this.y, img: this.image}
    }
}