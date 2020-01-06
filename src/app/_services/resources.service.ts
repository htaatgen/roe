import {Injectable} from '@angular/core';
import {MapService} from "./map.service";

@Injectable({
    providedIn: 'root'
})
export class ResourcesService {

    constructor(private map: MapService) {
    }

    startResourcesUpdating(logicLoop) {
        logicLoop.subscribe(time => this.grow());
    }

    grow() {
        this.map.empires.forEach(empire => {
            empire.ownedSettlements.forEach(settlement => empire.resources += this.calculateIncome(settlement));
        })
    }

    calculateIncome(settlement): number {
        let resourceDelta = 0;

        resourceDelta += settlement.settlementLevel;


        settlement.tile.getResources().forEach(resource=>{
            resourceDelta += resource.income;
        });

        resourceDelta += resourceDelta*settlement.population.economicSkill;


        return resourceDelta;
    }
}
