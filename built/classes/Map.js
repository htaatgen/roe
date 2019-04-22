import { Tile } from "./Tile.js";
var Map = /** @class */ (function () {
    function Map(height, width) {
        this.size = { height: height, width: width };
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                this.tiles.push(new Tile(x, y));
            }
        }
    }
    return Map;
}());
export { Map };
