import {Injectable} from '@angular/core';
import {GraphicsService} from "./graphics.service";
import {MapService} from "./map.service";
import {Coordinates} from "../_classes/Coordinates";

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    constructor(private gfx: GraphicsService, private map: MapService) {
    }

    startBakeUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            // this.map.tiles.forEach(tile => this.bakeImage(tile));
        })
    }

    bakeImage(tile) {
        if (!tile.bakeValid) {
            let bakingCanvas = document.createElement("canvas");
            bakingCanvas.width = 168;
            bakingCanvas.height = 104;
            let bakingCtx = bakingCanvas.getContext("2d");

            for (let renderPass = 0; renderPass <= 1; renderPass++) {
                bakingCtx.clearRect(0, 0, bakingCanvas.width, bakingCanvas.height);
                tile.renderOrders[renderPass].forEach(drawAction => {
                    const location = this.toReal(drawAction.x, drawAction.y);
                    const img = this.gfx[drawAction.img[0]][drawAction.img[1]];
                    if (renderPass > 0) {
                        location.y -= 0.5 * img.height;
                        location.x -= 0.5 * img.width - 64;
                    }
                    bakingCtx.drawImage(img, location.x + 20, location.y + 20);
                });
                tile.bakedImage[renderPass] = new Image();
                tile.bakedImage[renderPass].src = bakingCanvas.toDataURL();
            }

            tile.bakeValid = true;
        }
    }

    determineAvailableFeatureLocations(tile) {
        let bakingCanvas = document.createElement("canvas");
        bakingCanvas.width = 128;
        bakingCanvas.height = 64;
        let bakingCtx = bakingCanvas.getContext("2d");

        tile.getFeatureLocationBlockers().forEach(drawAction => {
            const location = this.toReal(0, 0);
            const img = this.gfx[drawAction[0]][drawAction[1]];
            bakingCtx.drawImage(img, location.x, location.y);
        });

        tile.availableFeatureLocations = [];

        for (let x = 0.05; x < 0.95; x += 0.1) {
            for (let y = 0.05; y < 0.95; y += 0.1) {
                tile.availableFeatureLocations.push(new Coordinates(x, y))
            }
        }


        tile.availableFeatureLocations = tile.availableFeatureLocations.filter(featureLocation => {
            const imgData = bakingCtx.getImageData(featureLocation.asRealX() - 1, featureLocation.asRealY() - 1, 3, 3);
            return imgData.data.every(rgba => rgba === 0);
        })

        tile.featureLocationCount = tile.availableFeatureLocations.length;
    }

    toReal(x, y) {
        return {
            x: (x - y) * 64,
            y: ((x + y) / 2) * 64
        }
    }
}
