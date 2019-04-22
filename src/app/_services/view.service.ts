import {Injectable} from '@angular/core';
import {GraphicsService} from "./graphics.service";
import {PathsService} from "./paths.service";
import {SelectionService} from "./selection.service";

@Injectable({
    providedIn: 'root'
})
export class ViewService {
    public viewport: { x: number, y: number, height: number, width: number };
    private ctx;

    constructor(private gfx: GraphicsService, private paths: PathsService, private selection: SelectionService) {
    }

    setCanvas(canvasElement, x: number, y: number, height, width) {
        this.viewport = {x: x, y: y, height: height, width: width}

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
        this.viewport.x = x;
        this.viewport.y = y;
    }

    render(tiles) {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);

        let tilesInView = [];

        //Which tiles are in view?
        tiles.forEach(tile => {
            const location = this.toReal(tile.x, tile.y);
            if (this.inViewport(location.x, location.y)) {
                tilesInView.push(tile);
            }
        });

        //Render baked image
        tilesInView.forEach(tile => {
            const location = this.toReal(tile.x, tile.y);
            this.ctx.drawImage(tile.bakedImage, location.x, location.y);
        });
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
            let tileCounter = 0.3;
            tile.armies.forEach(army => {
                const location = this.toReal(tile.x + tileCounter, tile.y);
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
                tileCounter += 0.2
            })
        });

        //Draw tile names
        tilesInView.forEach(tile => {
            const settlement = tile.getSettlement();
            if (settlement !== null) {
                const location = this.toReal(tile.x+ settlement.x, tile.y + settlement.y);
                const textWidth = this.ctx.measureText(settlement.nameRoot).width;
                this.ctx.globalAlpha = 0.4;
                this.ctx.fillStyle = tile.owningEmpire.colour;
                this.ctx.fillRect(location.x + 12 - 0.5 * textWidth, location.y + 26, textWidth + 6, 11);
                this.ctx.globalAlpha = 1.0;
                this.ctx.fillStyle = '#ffffff'
                this.ctx.fillText(settlement.nameRoot, location.x + 15 - 0.5 * textWidth, location.y + 35)
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
            y: ((x + y) / 2) * 64 + this.viewport.y
        }
    }

    inViewport(x, y) {
        return (x > -2 * 64
            && x < this.viewport.width + 2 * 64
            && y > -2 * 64
            && y < this.viewport.height + 2 * 64);
    }
}
