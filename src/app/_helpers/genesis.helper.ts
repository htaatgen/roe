import {Tile} from "../_classes/Tile";
import {TileFeatureMountain} from "../_classes/tile-features/TileFeatureMountain";
import {TileFeatureMountainLow} from "../_classes/tile-features/TileFeatureMountainLow";
import {TileFeatureMountainPeak} from "../_classes/tile-features/TileFeatureMountainPeak";
import {TileFeatureForestSnow} from "../_classes/tile-features/TileFeatureForestSnow";
import {TileFeatureForestPine} from "../_classes/tile-features/TileFeatureForestPine";
import {TileFeatureForestJungle} from "../_classes/tile-features/TileFeatureForestJungle";
import {TileFeatureForestTemp} from "../_classes/tile-features/TileFeatureForestTemp";
import {TileFeatureSettlement} from "../_classes/tile-features/TileFeatureSettlement";
import {TileFeatureVillage} from "../_classes/tile-features/TileFeatureVillage";
import {isNullOrUndefined} from "util";

export class GenesisHelper {

    static create(height: number, width: number) {

        //Create tileArray
        let map: Array<Tile> = [];
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                map.push(new Tile(x, y))
            }
        }

        //Assign neighbours
        map.forEach(tile => {
            tile.neighbours.north = map.find(candidateTile => candidateTile.x == tile.x && candidateTile.y == tile.y - 1);
            tile.neighbours.south = map.find(candidateTile => candidateTile.x == tile.x && candidateTile.y == tile.y + 1);
            tile.neighbours.west = map.find(candidateTile => candidateTile.x == tile.x - 1 && candidateTile.y == tile.y);
            tile.neighbours.east = map.find(candidateTile => candidateTile.x == tile.x + 1 && candidateTile.y == tile.y);
            tile.neighbours.northwest = map.find(candidateTile => candidateTile.x == tile.x - 1 && candidateTile.y == tile.y - 1);
            tile.neighbours.northeast = map.find(candidateTile => candidateTile.x == tile.x + 1 && candidateTile.y == tile.y - 1);
            tile.neighbours.southwest = map.find(candidateTile => candidateTile.x == tile.x - 1 && candidateTile.y == tile.y + 1);
            tile.neighbours.southeast = map.find(candidateTile => candidateTile.x == tile.x + 1 && candidateTile.y == tile.y + 1);
        })


        //Setting height seeds
        for (let x = 0; x < width * height / 4.5; x++) {
            let dir = Math.floor(Math.random() * 8);
            const h = Math.random() * 6 - 2;
            const length = height * 0.1 + Math.random() * height * 0.4;

            let tile = map.find(t => t.x == Math.floor(Math.random() * width) && t.y == Math.floor(Math.random() * height));

            for (let d = 0; d < length; d++) {
                if (tile == undefined) {
                    break;
                } else {
                    tile.height += h;
                    if (Math.random() > 0.8) {
                        dir = dir + Math.round((Math.random() * 2 - 1)) % 8;
                    }
                    tile = tile.neighbourByDirection(dir);
                }
            }
        }

        //Setting moisture seeds
        map.forEach(tile => {
            tile.moisture = Math.random() * 7 - 4
        })   //Setting moisture seeds

        //Setting temperature
        map.forEach(tile => {
            tile.temperature = 10 * -Math.abs(tile.y - height / 2) / height;
        })

        // Equalizing heights/moisture
        map.forEach(tile => {
            let neighbourAmount = 0;
            let neighbourHeights = 0;
            let neighbourMoisture = 0;
            tile.eachNeighbour((neighbour: any) => {
                neighbourHeights += neighbour.height * Math.random();
                neighbourMoisture += neighbour.moisture;
                neighbourAmount++;
            });

            tile.height = (tile.height + 2.5 * neighbourHeights) / neighbourAmount;
            tile.moisture = (tile.moisture + 2 * neighbourMoisture) / (3 * neighbourAmount);
        })

        //Fill with appropriate tiles/features
        map.forEach(tile => {
            setCoasts(tile);
            setBiome(tile);
            setForests(tile);
            setMountains(tile);
        });

        map.forEach(tile => {
            setTileTransitions(tile);

            if (tile.height >= 0) {
                let chance = 0.05;
                tile.eachNeighbour(neighbour => {
                    if (neighbour.height < 0) {
                        chance += 0.1
                    }
                })
                if (tile.temperature > -3) {
                    chance += 0.1
                }
                if (tile.moisture > 0) {
                    chance += 0.1
                }

                if (tile.biome == 'Desert') {
                    chance -= 0.4
                }

                if (Math.random() < chance) {
                    if (Math.random() < 0.3) {
                        tile.addFeature(TileFeatureSettlement)
                    } else {
                        tile.addFeature(TileFeatureVillage)
                    }
                }
            }
        })

        return map;
    }
}

function setCoasts(tile: Tile) {
    if (tile.height >= 0) {
        let coastCode = '';
        if (!isNullOrUndefined(tile.neighbours.north) && tile.neighbours.north.height < 0) {
            coastCode += 'n';
        }
        if (!isNullOrUndefined(tile.neighbours.south) && tile.neighbours.south.height < 0) {
            coastCode += 's';
        }
        if (!isNullOrUndefined(tile.neighbours.east) && tile.neighbours.east.height < 0) {
            coastCode += 'e';
        }
        if (!isNullOrUndefined(tile.neighbours.west) && tile.neighbours.west.height < 0) {
            coastCode += 'w';
        }
        if (coastCode.length > 0) {
            tile.coast = coastCode;
            if (coastCode == 'nsew') {
                tile.tileModifiers.push(['coast', coastCode + '_' + Math.ceil(Math.random() * 3)]);
            } else {
                tile.tileModifiers.push(['coast', coastCode + '_' + Math.ceil(Math.random() * 1)]);
            }
        }
        if (!isNullOrUndefined(tile.neighbours.northwest)
            && tile.neighbours.northwest.height < 0
            && !coastCode.includes('w')
            && !coastCode.includes('n')
        ) {
            tile.tileModifiers.push(['coast', 'cnw_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.northeast)
            && tile.neighbours.northeast.height < 0
            && !coastCode.includes('e')
            && !coastCode.includes('n')
        ) {
            tile.tileModifiers.push(['coast', 'cne_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.southwest)
            && tile.neighbours.southwest.height < 0
            && !coastCode.includes('w')
            && !coastCode.includes('s')
        ) {
            tile.tileModifiers.push(['coast', 'csw_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.southeast)
            && tile.neighbours.southeast.height < 0
            && !coastCode.includes('s')
            && !coastCode.includes('e')
        ) {
            tile.tileModifiers.push(['coast', 'cse_' + Math.ceil(Math.random() * 1)]);
        }
    }
}

function setBiome(tile: Tile) {
    if (tile.height < -2) {
        tile.biome = 'Deep water';
        tile.image = ['tiles', 'ocean'];
        tile.travellingTime = 16;
    } else if (tile.height < 0) {
        tile.biome = 'Water';
        tile.image = ['tiles', 'water_' + Math.ceil(Math.random() * 3)];
        tile.travellingTime = 8;
    } else if (tile.temperature > -2 && tile.moisture < -0.1) {
        tile.biome = 'Desert';
        tile.image = ['tiles', 'desert_' + Math.ceil(Math.random() * 3)];
        tile.travellingTime = 2;
    } else if (tile.temperature < -4 && tile.moisture > 0) {
        tile.biome = 'Arctic';
        tile.image = ['tiles', 'snow'];
        tile.travellingTime = 2;
    } else if (tile.temperature < -3 && tile.moisture < 1) {
        tile.biome = 'Tundra';
        tile.image = ['tiles', 'tundra_' + Math.ceil(Math.random() * 3)];
        tile.travellingTime = 1.2;
    }
}

function setForests(tile: Tile) {
    if (tile.height > 0) {
        if (tile.biome == 'Arctic' && tile.moisture > 0.1) {
                tile.addFeature(TileFeatureForestSnow);
        } else if (tile.temperature < -3 && tile.moisture > 0) {
                tile.addFeature(TileFeatureForestPine);
        } else if (tile.temperature > -2 && tile.moisture > 0.1) {
                tile.addFeature(TileFeatureForestJungle);
        } else if (tile.moisture > 0) {
                tile.addFeature(TileFeatureForestTemp);
        }
    }
}

function setMountains(tile: Tile) {
    if (tile.height > 5) {
        tile.addFeature(TileFeatureMountainPeak);
        tile.addFeature(TileFeatureMountain);
        tile.addFeature(TileFeatureMountainLow);
        tile.travellingTime *= 6;
    } else if (tile.height > 3) {
        tile.addFeature(TileFeatureMountain);
        tile.addFeature(TileFeatureMountainLow);
        tile.travellingTime *= 4;
    } else if (tile.height > 1.6) {
        tile.addFeature(TileFeatureMountainLow);
        tile.travellingTime *= 1.5;
    }
}

function setTileTransitions(tile: Tile) {
    if (tile.biome !== 'Grassland' && tile.height > 0) {
        let tileTransitionCode = '';
        if (!isNullOrUndefined(tile.neighbours.north) && tile.neighbours.north.biome === 'Grassland') {
            tile.tileModifiers.unshift(['tile_edges', 'grass_n_' + Math.ceil(Math.random() * 1)]);
            tileTransitionCode += 'n';
        }
        if (!isNullOrUndefined(tile.neighbours.south) && tile.neighbours.south.biome === 'Grassland') {
            tile.tileModifiers.unshift(['tile_edges', 'grass_s_' + Math.ceil(Math.random() * 1)]);
            tileTransitionCode += 's';
        }
        if (!isNullOrUndefined(tile.neighbours.east) && tile.neighbours.east.biome === 'Grassland') {
            tile.tileModifiers.unshift(['tile_edges', 'grass_e_' + Math.ceil(Math.random() * 1)]);
            tileTransitionCode += 'e';
        }
        if (!isNullOrUndefined(tile.neighbours.west) && tile.neighbours.west.biome === 'Grassland') {
            tile.tileModifiers.unshift(['tile_edges', 'grass_w_' + Math.ceil(Math.random() * 1)]);
            tileTransitionCode += 'w';
        }
        if (!isNullOrUndefined(tile.neighbours.northeast)
            && tile.neighbours.northeast.biome === 'Grassland'
            && !tileTransitionCode.includes('e')
            && !tileTransitionCode.includes('n')) {
            tile.tileModifiers.unshift(['tile_edges', 'grass_cne_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.northwest)
            && tile.neighbours.northwest.biome === 'Grassland'
            && !tileTransitionCode.includes('w')
            && !tileTransitionCode.includes('n')) {
            tile.tileModifiers.unshift(['tile_edges', 'grass_cnw_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.southeast)
            && tile.neighbours.southeast.biome === 'Grassland'
            && !tileTransitionCode.includes('e')
            && !tileTransitionCode.includes('s')) {
            tile.tileModifiers.unshift(['tile_edges', 'grass_cse_' + Math.ceil(Math.random() * 1)]);
        }
        if (!isNullOrUndefined(tile.neighbours.southwest)
            && tile.neighbours.southwest.biome === 'Grassland'
            && !tileTransitionCode.includes('w')
            && !tileTransitionCode.includes('s')) {
            tile.tileModifiers.unshift(['tile_edges', 'grass_csw_' + Math.ceil(Math.random() * 1)]);
        }
    }
}

