import {Resource} from "../Resource";

export class Stone extends Resource {
    constructor() {
        super('stone', 'Stone', ['tile_icons', 'stone']);
    }
}