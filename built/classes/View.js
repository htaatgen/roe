var View = /** @class */ (function () {
    function View(x, y, height, width) {
        this.viewport = { x: x, y: y, height: height, width: width };
        var canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "8px Arial";
        this.ctx.canvas.height = height;
        this.ctx.canvas.width = width;
    }
    View.prototype.update = function (x, y) {
        this.viewport.x = x;
        this.viewport.y = y;
    };
    View.prototype.render = function (tiles) {
        var _this = this;
        tiles.forEach(function (tile) {
            tile.render().forEach(function (drawAction) {
                var location = _this.toIso(drawAction.x, drawAction.y);
                _this.ctx.drawImage(drawAction.img, location.x, location.y);
            });
        });
    };
    View.prototype.toCartesian = function (x, y) {
        return {
            x: (y + (x / 2)) / 64,
            y: (y - (x / 2)) / 64
        };
    };
    View.prototype.toIso = function (x, y) {
        return {
            x: (x - y) * 64,
            y: ((x + y) / 2) * 64
        };
    };
    return View;
}());
export { View };
