import {Resource} from "../Resource";

export class Lumber extends Resource {
    constructor() {
        super('wood', 'Lumber', ['tile_icons', 'lumber']);
    }
}