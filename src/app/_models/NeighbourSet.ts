import {Tile} from "../_classes/Tile";

export interface NeighbourSet {
    north: Tile;
    south: Tile;
    east: Tile;
    west: Tile;
    northwest: Tile;
    northeast: Tile;
    southwest: Tile;
    southeast: Tile;
}