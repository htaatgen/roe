import {Tile} from "./Tile";
import {Resource} from "./Resource";

export class TileFeature {
    public id: number;
    public name: string;
    public imageSet: any[] =[];
    public locations: any[] = [];
    public tile: Tile;
    public resources: Resource[] = [];
    public addedTravellingTime = 1;
    public renderCount;
    public renderOrder;
    public renderCenteringWeight;

    constructor(tile: Tile, renderCount = 1, renderOrder = 1, renderCenteringWeight = 0, imageBase = '', imageCount = 0) {
        this.id = window.performance.now();
        this.tile = tile;
        this.renderCount = renderCount;
        this.renderOrder = renderOrder;
        this.renderCenteringWeight = renderCenteringWeight;
        Array.from(Array(imageCount).keys()).forEach(key => this.imageSet.push(['features', imageBase + (key + 1)]));
    }

    public setRenderLocations() {
        this.locations = [];
        for (let i = 0; i < Math.ceil(this.renderCount * (this.tile.featureLocationCount / 100)); i++) {
            const featureLocation = this.tile.getFeatureLocation();
            if (featureLocation !== null) {
                this.locations.push({
                    x: featureLocation.x,
                    y: featureLocation.y,
                    img: this.imageSet[Math.floor(Math.random() * this.imageSet.length)]
                });
            }
        }
    }

    public renderOrders() {
        let orders = [];
        for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i] !== undefined) {
                orders.push({x: this.locations[i].x, y: this.locations[i].y, img: this.locations[i].img});
            }
        }
        return orders;
    }

    toJson() {
        return {
            name: this.name,
            imageSet: this.imageSet,
            locations: this.locations,
            resources: this.resources,
            addedTravellingTime: this.addedTravellingTime
        }
    }
}