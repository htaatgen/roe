import {TileFeature} from "./TileFeature";
import {TileFeatureSettlement} from "./tile-features/TileFeatureSettlement";
import {Army} from "./Army";
import {Empire} from "./Empire";
import {NeighbourSet} from "../_models/NeighbourSet";

export class Tile {
    public x: number;
    public y: number;
    public image;
    public tileModifiers: string[][] = [];
    public coast: string = null;
    public neighbours: NeighbourSet = {
        north: null,
        south: null,
        east: null,
        west: null,
        northwest: null,
        northeast: null,
        southwest: null,
        southeast: null
    };
    public biome: string;
    public height: number;
    public moisture: number;
    public temperature: number;
    public travellingTime: number;
    public visited = false;
    public renderOrders = [[{x: this.x, y: this.y, img: this.image}], [], [], []];
    public bakedImage: HTMLImageElement;
    public bakeValid = false;

    public features: TileFeature[] = [];
    public armies: Army[] = [];
    public owningEmpire: Empire = null;
    public discovered: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.height = -3;
        this.moisture = 0;
        this.temperature = 0;
        this.image = ['tiles', 'grass_' + Math.ceil(Math.random() * 3)];
        this.biome = 'Grassland';
        this.travellingTime = 1;
    }

    updateRenderOrders() {
        this.renderOrders = [[{x: 0, y: 0, img: this.image}], [], [], []];

        this.tileModifiers.forEach(tileModifier => {
            this.renderOrders[0].push({x: 0, y: 0, img: tileModifier});
        });

        this.features.forEach(feature => {
            this.renderOrders[feature.renderPass].push(feature.renderOrders())
        });
    }

    hasFeature(featureName) {
        return this.features.find(element => element.name == featureName) !== undefined;
    }

    getFeature(featureName) {
        return this.features.find(element => element.name == featureName);
    }

    hasSettlement(): boolean {
        this.features.forEach(element => {
            if (element instanceof TileFeatureSettlement) {
                return true
            }
        });
        return false;
    }

    getSettlement(): TileFeatureSettlement {
        let settlement = null;
        this.features.forEach(element => {
            if (element instanceof TileFeatureSettlement) {
                settlement = element;
            }
        });
        return settlement;
    }

    addFeature(feature) {
        this.features.push(new feature(this));
        this.features.sort((a, b) => a.x - b.x);
        this.updateRenderOrders();
    }

    everyNeighbour(test) {
        return Object.values(this.neighbours).every((neighbour: any) => {
            if (neighbour !== undefined) {
                return test(neighbour);
            }
            return true;
        });
    }

    eachNeighbour(task) {
        return Object.values(this.neighbours).forEach((neighbour: any) => {
            if (neighbour !== undefined) {
                task(neighbour);
            }
        });
    }

    neighbourByDirection(dir) {
        switch (dir) {
            case 0:
                return this.neighbours.north;
            case 1:
                return this.neighbours.northeast;
            case 2:
                return this.neighbours.east;
            case 3:
                return this.neighbours.southeast;
            case 4:
                return this.neighbours.south;
            case 5:
                return this.neighbours.southwest;
            case 6:
                return this.neighbours.west;
            case 7:
                return this.neighbours.northwest;
        }
        return undefined;
    }

    getResources() {
        let resources = [];
        this.features.forEach(feature => {
            feature.resources.forEach(resource => resources.push(resource));
        });

        return resources.sort();
    }
}