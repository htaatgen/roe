import {Component} from '@angular/core';
import {SelectionService} from "../../_services/selection.service";
import {TechService} from "../../_services/tech.service";
import {TechnologiesEnum} from "../../_enum/technologies";
import {TechItem} from "../../_interfaces/TechItem";
import {TechItemResearch} from "../../_interfaces/TechItemResearch";
import {GameloopService} from "../../_services/gameloop.service";
import {PlayerService} from "../../_services/player.service";

@Component({
    selector: 'app-modal-techtree',
    templateUrl: './modal-techtree.component.html',
    styleUrls: ['./modal-techtree.component.css']
})
export class ModalTechtreeComponent {
    availableTechnologies: TechItem[] = [];
    currentlyResearching: TechItemResearch[] = [];

    constructor(public selection: SelectionService, public techService: TechService, private gl: GameloopService, public player: PlayerService) {
        this.getAvailableResearch();
        this.techService.researchComplete.subscribe(() => this.getAvailableResearch());
        this.gl.renderLoop.subscribe(() => this.getCurrentlyResearching())
    }

    research(techItem: TechItem) {
        this.techService.addResearch(this.player.empire.techtree, techItem, this.player.empire);
        this.getAvailableResearch();
    }

    getAvailableResearch() {
        this.getCurrentlyResearching();
        let researchedIds = this.player.empire.techtree.map(tech => tech.id);
        let researchingIds = this.currentlyResearching.map(research => research.techItem.id);
        this.availableTechnologies = (new TechnologiesEnum()).technologies.filter(tech =>
            tech.requires.every(require => researchedIds.includes(require)) && !researchedIds.concat(researchingIds).includes(tech.id)
        )
    }

    getCurrentlyResearching() {
        this.currentlyResearching = this.techService.researching.filter(research =>
            research.owner.id === this.player.empire.id
        )
    }
}
