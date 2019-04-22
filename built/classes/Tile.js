var Tile = /** @class */ (function () {
    function Tile(x, y) {
        this.location = { x: x, y: y };
        this.img = new Image();
        this.img.src = "../assets/tiles/grass.png";
    }
    Tile.prototype.render = function () {
        return [{ x: this.location.x, y: this.location.y, img: this.img }];
    };
    return Tile;
}());
export { Tile };
