import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Message} from "../_interfaces/Message";
import {Unit} from "../_classes/Unit";
import {UnitRecruiting} from "../_interfaces/UnitRecruiting";
import {UnitBlueprint} from "../_classes/UnitBlueprint";
import {Army} from "../_classes/Army";

@Injectable({
    providedIn: 'root'
})
export class RecruitingService {
    recruiting: UnitRecruiting[] = [];
    lastTime: number = window.performance.now();
    recruitingComplete = new BehaviorSubject<Message>(null);

    constructor() {
    }

    startRecruitingUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.recruiting.forEach(
                (recruiting, key) => {
                    if (recruiting.progress > recruiting.unitBlueprint.getRecruitingTime()) {
                        recruiting.unitBlueprint.spawn(recruiting.target);
                        console.log(recruiting.target);
                        this.recruiting.splice(key, 1);
                        this.recruitingComplete.next({message: 'Training complete: ' + recruiting.unitBlueprint.name})
                    } else {
                        recruiting.progress += time - this.lastTime;
                    }
                })
            this.lastTime = time;
        })
    }

    addRecruiting(target: Army, unitBlueprint: UnitBlueprint) {
        if (target.owningEmpire.resources > unitBlueprint.getRecruitingCost()) {
            target.owningEmpire.resources -= unitBlueprint.getRecruitingCost();
            this.recruiting.push(
                {
                    target: target,
                    progress: 0,
                    unitBlueprint: unitBlueprint
                }
            )
        }
    }
}
