import {Resource} from "../Resource";

export class Grain extends Resource {
    constructor() {
        super('food', 'Grain', ['tile_icons', 'tropical_fruit']);
    }
}