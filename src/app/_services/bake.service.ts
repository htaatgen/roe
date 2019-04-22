import {Injectable} from '@angular/core';
import {GraphicsService} from "./graphics.service";
import {MapService} from "./map.service";

@Injectable({
    providedIn: 'root'
})
export class BakeService {

    constructor(private gfx: GraphicsService, private map: MapService) {
    }

    startBakeUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.map.tiles.forEach(tile => this.bakeImage(tile));
        })
    }

    bakeImage(tile) {
        if(!tile.bakeValid) {
            let bakingCanvas = document.createElement("canvas");
            bakingCanvas.width = 128;
            bakingCanvas.height = 64;
            let bakingCtx = bakingCanvas.getContext("2d");

            for (let renderPass = 0; renderPass <= 3; renderPass++) {
                tile.renderOrders[renderPass].forEach(drawAction => {
                    const location = this.toReal(drawAction.x, drawAction.y);
                    const img = this.gfx[drawAction.img[0]][drawAction.img[1]];
                    bakingCtx.drawImage(img, location.x, location.y);
                });
            }

            tile.bakedImage = new Image();
            tile.bakedImage.src = bakingCanvas.toDataURL();
            tile.bakeValid = true;
        }
    }

    toReal(x, y) {
        return {
            x: (x - y) * 64,
            y: ((x + y) / 2) * 64
        }
    }
}
