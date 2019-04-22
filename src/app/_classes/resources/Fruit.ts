import {Resource} from "../Resource";

export class Fruit extends Resource {
    constructor() {
        super('food', 'Fruit', ['tile_icons', 'fruit']);
    }
}