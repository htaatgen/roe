import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ViewService} from "./_services/view.service";
import {MapService} from "./_services/map.service";
import {GraphicsService} from "./_services/graphics.service";
import {ControlsService} from "./_services/controls.service";
import {GameloopService} from "./_services/gameloop.service";
import {InputService} from "./_services/input.service";
import {PathsService} from "./_services/paths.service";
import {BattleService} from "./_services/battle.service";
import {TechService} from "./_services/tech.service";
import {BakeService} from "./_services/bake.service";
import {MatDialog} from "@angular/material";
import {ModalNewGameComponent} from "./modal-new-game/modal-new-game.component";
import {PlayerService} from "./_services/player.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('mainCanvas') mainCanvas: ElementRef;
    loadingMessage: string = 'Loading...';

    constructor(public view: ViewService,
                private map: MapService,
                private gfx: GraphicsService,
                public ctrl: ControlsService,
                private gl: GameloopService,
                private input: InputService,
                private battles: BattleService,
                private paths: PathsService,
                private tech: TechService,
                private bake: BakeService,
                private player: PlayerService,
                private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.gfx.load().subscribe(imageCount => {
            this.loadingMessage = 'Loading images: ' + imageCount + ' remaining...';
            if (imageCount == 0) {
                this.loadingMessage = 'Initialising map...';
                this.view.setCanvas(this.mainCanvas, 0, 0, window.innerHeight - 5, window.innerWidth);
                this.map.initMap(80, 80);
                this.loadingMessage = 'Baking tiles...';
                this.map.tiles.forEach(tile => this.bake.bakeImage(tile));
                this.loadingMessage = 'Creating time...';
                this.gl.startLoop();
                this.gl.renderLoop.subscribe(delta => {
                    this.input.handle();
                    this.view.render(this.map.tiles);
                });
                this.bake.startBakeUpdating(this.gl.logicLoop);
                this.paths.startPathsUpdating(this.gl.logicLoop);
                this.battles.startBattlesUpdating(this.gl.logicLoop);
                this.tech.startResearchUpdating(this.gl.logicLoop);

                this.loadingMessage = 'Done...';
                this.openNewGame();
            }
        })
    }

    openNewGame(): void {
        this.dialog.open(ModalNewGameComponent, {
            height: '400px',
            width: '600px',
            panelClass: 'modal',
            disableClose: true
        }).afterClosed().subscribe(() => {
            this.loadingMessage = null;
            this.view.set(this.player.empire.capital.tile.x, this.player.empire.capital.tile.y);
        });
    }
}
