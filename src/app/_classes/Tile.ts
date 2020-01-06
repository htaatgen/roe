import {TileFeature} from "./TileFeature";
import {TileFeatureSettlement} from "./tile-features/TileFeatureSettlement";
import {Army} from "./Army";
import {Empire} from "./Empire";
import {NeighbourSet} from "../_interfaces/NeighbourSet";
import {isNullOrUndefined} from "util";

export class Tile {
    public x: number;
    public y: number;
    public image;
    public tileModifiers: string[][] = [];
    public coast: string = '';
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
    public bakedImage: HTMLImageElement[] = [];
    public bakeValid = false;
    public location: any;
    public availableFeatureLocations: any[] = [];
    public featureLocationCount: number;

    public features: TileFeature[] = [];
    public armies: Army[] = [];
    public owningEmpire: Empire = null;
    public discovered: boolean = true;

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

        this.features.sort((a, b) => b.renderOrder - a.renderOrder);
        this.features.forEach(feature => {
            feature.setRenderLocations();
            this.renderOrders[1] = this.renderOrders[1].concat(feature.renderOrders());
        });

        this.renderOrders[1].sort((a, b) => a.y - b.y);
    }

    getFeatureLocationBlockers() {
        return this.tileModifiers.filter(tileModifier => {
            return tileModifier[0] == 'coast';
        });
    }

    hasFeature(featureName) {
        return this.features.find(element => element.name == featureName || element.category == featureName) !== undefined;
    }

    getFeature(featureName) {
        return this.features.find(element => element.name == featureName);
    }

    hasSettlement(): boolean {
        let settlement = false;
        this.features.forEach(element => {
            if (element instanceof TileFeatureSettlement) {
                settlement = true;
            }
        });
        return settlement;
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
        this.features.sort((a, b) => b.renderOrder - a.renderOrder);
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

    toJson() {
        return {
            x: this.x,
            y: this.y,
            image: this.image,
            tileModifiers: this.tileModifiers,
            coast: this.coast,
            biome: this.biome,
            height: this.height,
            moisture: this.moisture,
            temperature: this.temperature,
            travellingTime: this.travellingTime,
            visited: this.visited,

            features: this.features.map(feature => feature.toJson()),
            armies: this.armies.map(army => army.toJson()),
            owningEmpire: isNullOrUndefined(this.owningEmpire) ? null : this.owningEmpire.id,
            discovered: this.discovered
        }
    }

    getFeatureLocation(avoidEdges = '', renderMargin = 0) {
        let locations = [...this.availableFeatureLocations];

        if(avoidEdges.includes('n')){
            locations = locations.filter(location=>{
                return Math.random() > 1 - location.y;
            })
        }
        if(avoidEdges.includes('s')){
            locations = locations.filter(location=>{
                return Math.random() > location.y;
            })
        }
        if(avoidEdges.includes('e')){
            locations = locations.filter(location=>{
                return Math.random() > location.x;
            })
        }
        if(avoidEdges.includes('w')){
            locations = locations.filter(location=>{
                return Math.random() > 1 - location.x;
            })
        }
        if(renderMargin > 0) {
            locations = locations.filter(location=>{
                return renderMargin < location.x
                    && 1 - renderMargin > location.x
                    && renderMargin < location.y
                    && 1 - renderMargin > location.y
            })
        }


        let randomLocation = locations.splice(Math.floor(Math.random() * locations.length), 1);
        if (randomLocation.length === 0) {
            return null;
        }
        return randomLocation[0];
    }

}