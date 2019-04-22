import {Resource} from "../Resource";

export class Gemstones extends Resource {
    constructor() {
        super('luxury', 'Gemstones', ['tile_icons', 'gemstones']);
    }
}