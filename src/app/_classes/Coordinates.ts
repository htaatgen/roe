export class Coordinates {
    public readonly x;
    public readonly y;

    public constructor(x, y) {
        this.x = Number(x.toFixed(2));
        this.y = Number(y.toFixed(2));
    }

    static fromReal(x, y) {
        return new Coordinates((y + (x / 2)) / 64,
            (y - (x / 2)) / 64)
    }

    asRealX() {
        return Math.round((this.x - this.y) * 64 + 64);
    }

    asRealY() {
        return Math.round((this.x + this.y) * 32);
    }
}