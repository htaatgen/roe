import {Injectable} from '@angular/core';
import {GraphicsService} from "./graphics.service";
import {PathsService} from "./paths.service";
import {SelectionService} from "./selection.service";
import {isNullOrUndefined} from "util";

@Injectable({
    providedIn: 'root'
})
export class ViewService {
    public viewport: { x: number, y: number, height: number, width: number };
    private ctx;

    private orderedLocationModifiers = [
        {x: 0.7, y: 0},
        {x: 0.9, y: 0},
        {x: 0.7, y: 0.2},
        {x: 0.5, y: 0},
        {x: 0.7, y: -0.2},
        {x: 0.9, y: 0.2},
        {x: 0.9, y: -0.2},
        {x: 0.5, y: 0.2},
        {x: 0.5, y: -0.2}
    ];

    constructor(private gfx: GraphicsService, private paths: PathsService, private selection: SelectionService) {
    }

    setCanvas(canvasElement, x: number, y: number, height, width) {
        this.viewport = {x: x, y: y, height: height, width: width};

        this.ctx = canvasElement.nativeElement.getContext('2d');

        this.ctx.font = "8px Arial";
        this.ctx.canvas.height = height;
        this.ctx.canvas.width = width;
    }

    update(x: number, y: number) {
        this.viewport.x += x;
        this.viewport.y += y;
    }

    set(x: number, y: number) {
        this.viewport.x = -(x - y) * 64 + (this.viewport.width / 2);
        this.viewport.y = -(x + y) * 32 + (this.viewport.height / 2);
    }

    render(tiles) {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);

        let tilesInView = [];

        //Which tiles are in view?
        tiles.forEach(tile => {
            tile.location = this.toReal(tile.x, tile.y);
            if (tile.discovered && this.inViewport(tile.location.x, tile.location.y)) {
                tile.location.x -= 20;
                tile.location.y -= 20;
                tilesInView.push(tile);
            }
        });

        //Render baked image
        for (let renderPass = 0; renderPass <= 1; renderPass++) {
            tilesInView.forEach(tile => {
                if (!isNullOrUndefined(tile.bakedImage[renderPass])) {
                    this.ctx.drawImage(tile.bakedImage[renderPass], tile.location.x, tile.location.y);
                }
            });
        }

        //Draw tile select marker
        if (this.selection.tile.value !== null) {
            const location = this.toReal(this.selection.tile.value.x, this.selection.tile.value.y);
            const img = this.gfx['ui']['reticule'];
            this.ctx.drawImage(img, location.x, location.y);
        }

        //Render paths
        this.ctx.lineWidth = 5;
        this.paths.paths.forEach(path => {
            path.render.forEach(segment => {
                const from = this.toReal(segment.from.x, segment.from.y);
                const to = this.toReal(segment.to.x, segment.to.y);
                if (segment.done) {
                    this.ctx.strokeStyle = '#ff1708';
                } else {
                    this.ctx.strokeStyle = '#4c0303';
                }
                this.ctx.beginPath();
                this.ctx.moveTo(from.x, from.y);
                this.ctx.lineTo(to.x, to.y);
                this.ctx.stroke();

                if (segment.progress > 0 && segment.progress <= 1) {
                    this.ctx.strokeStyle = '#ff1708';
                    this.ctx.beginPath();
                    this.ctx.moveTo(from.x, from.y);
                    this.ctx.lineTo(from.x + Math.floor((to.x - from.x) * segment.progress), from.y + Math.floor((to.y - from.y) * segment.progress));
                    this.ctx.stroke();
                }
            })
        })

        //Draw unit banners
        tilesInView.forEach(tile => {
            tile.armies.forEach((army, armyCount) => {
                if (this.orderedLocationModifiers[armyCount] == undefined) {
                    return;
                }
                const mod = this.orderedLocationModifiers[armyCount];
                const location = this.toReal(tile.x + mod.x, tile.y + mod.y);
                const img = this.gfx['ui']['banner'];
                this.ctx.drawImage(img, location.x + 10, location.y - 30);
                this.ctx.globalAlpha = 0.4;
                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(location.x + 11, location.y - 26, 11, 30);
                this.ctx.globalAlpha = 1.0;
                this.ctx.fillStyle = army.owningEmpire.colour;
                let startingLength = 0;
                length = army.units.reduce((accumulator, unit) => accumulator + (unit.stats.size / unit.stats.maxSize), startingLength);
                this.ctx.fillRect(location.x + 11, Math.round(location.y + 4 - length * 2), 11, Math.round(length * 2));
            })
        });

        //Draw tile names
        tilesInView.forEach(tile => {
            if (tile.hasSettlement()) {
                const settlement = tile.getSettlement();
                const location = this.toReal(tile.x + settlement.locations[0].x, tile.y + settlement.locations[0].y);
                const textWidth = this.ctx.measureText(settlement.nameRoot).width;
                this.ctx.fillStyle = tile.owningEmpire.colour;
                this.ctx.fillRect(location.x + 12 + 50 - 0.5 * textWidth, location.y + 26 - 25, textWidth + 6, 11);
                this.ctx.fillStyle = tile.owningEmpire.textColour;
                this.ctx.fillText(settlement.nameRoot, location.x + 15 + 50 - 0.5 * textWidth, location.y + 35 - 25)
            }
        });
    }

    toMap(x, y) {
        x -= this.viewport.x;
        y -= this.viewport.y;
        return {
            x: (y + (x / 2)) / 64,
            y: (y - (x / 2)) / 64
        }
    }

    toReal(x, y) {
        return {
            x: (x - y) * 64 + this.viewport.x,
            y: (x + y) * 32 + this.viewport.y
        }
    }

    inViewport(x, y) {
        return (x > -128
            && x < this.viewport.width + 128
            && y > -128
            && y < this.viewport.height + 128);
    }
}
