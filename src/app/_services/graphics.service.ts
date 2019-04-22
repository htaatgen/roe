import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GraphicsService {

    private srcArray = [
        "tiles/grass_1.png",
        "tiles/grass_2.png",
        "tiles/grass_3.png",
        "tiles/water_1.png",
        "tiles/water_2.png",
        "tiles/water_3.png",
        "tiles/ocean.png",
        "tiles/desert_1.png",
        "tiles/desert_2.png",
        "tiles/desert_3.png",
        "tiles/snow.png",
        "tiles/tundra_1.png",
        "tiles/tundra_2.png",
        "tiles/tundra_3.png",
        "tile_edges/grass_n_1.png",
        "tile_edges/grass_s_1.png",
        "tile_edges/grass_e_1.png",
        "tile_edges/grass_w_1.png",
        "tile_edges/grass_cne_1.png",
        "tile_edges/grass_cnw_1.png",
        "tile_edges/grass_cse_1.png",
        "tile_edges/grass_csw_1.png",
        "coast/cne_1.png",
        "coast/cnw_1.png",
        "coast/cse_1.png",
        "coast/csw_1.png",
        "coast/n_1.png",
        "coast/s_1.png",
        "coast/e_1.png",
        "coast/w_1.png",
        "coast/ne_1.png",
        "coast/se_1.png",
        "coast/sw_1.png",
        "coast/nw_1.png",
        "coast/ns_1.png",
        "coast/ew_1.png",
        "coast/nse_1.png",
        "coast/nsw_1.png",
        "coast/sew_1.png",
        "coast/new_1.png",
        "coast/nsew_1.png",
        "features/mountain_1.png",
        "features/mountain_2.png",
        "features/mountain_peak_1.png",
        "features/mountain_peak_2.png",
        "features/mountain_low_1.png",
        "features/mountain_low_2.png",
        "features/forest_temp_1.png",
        "features/forest_temp_2.png",
        "features/forest_pine_1.png",
        "features/forest_snow_1.png",
        "features/forest_jungle_1.png",
        "features/settlement_1_1.png",
        "features/settlement_1_2.png",
        "features/village_1.png",
        "features/village_2.png",
        "units/melee_1_1.png",
        "ui/reticule.png",
        "ui/banner.png",
        "tile_icons/cacao.png",
        "tile_icons/coffee.png",
        "tile_icons/copper.png",
        "tile_icons/tropical_fruit.png",
        "tile_icons/rare_pelts.png",
        "tile_icons/fruit.png",
        "tile_icons/furs.png",
        "tile_icons/gemstones.png",
        "tile_icons/gold.png",
        "tile_icons/hardwood_lumber.png",
        "tile_icons/iron.png",
        "tile_icons/lumber.png",
        "tile_icons/mountains.png",
        "tile_icons/silver.png",
        "tile_icons/stone.png",
        "tile_icons/tree.png",
        "tile_icons/village.png"
    ];
    private assetsDir = '../assets/';
    public tiles: any = {};
    public features: any = {};
    public tile_icons: any = {};
    public units: any = {};
    public ui: any = {};
    public coast: any = {};
    public tile_edges: any = {};

    constructor() {
    }

    load() {
        return new Observable((observer) => {
            let imageCount = this.srcArray.length;
            observer.next(imageCount);
            this.srcArray.forEach(src => {
                this.loadImage(src).onload = () => {
                    imageCount--;
                    observer.next(imageCount)
                }
            });
        });
    }


    loadImage(src) {
        const imgList = src.split('/');
        const category = imgList[0];
        const name = imgList[1].replace('.png', '');
        this[category][name] = new Image();
        this[category][name].src = this.assetsDir + src;
        return this[category][name];
    }

    getSrc(pathArray) {
        return this[pathArray[0]][pathArray[1]].src;
    }
}
