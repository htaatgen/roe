import {Resource} from "../Resource";

export class Gold extends Resource {
    constructor() {
        super('luxury', 'Gold', ['tile_icons', 'gold']);
    }
}