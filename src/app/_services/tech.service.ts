import {Injectable} from '@angular/core';
import {TechItem} from "../_models/TechItem";
import {BehaviorSubject} from "rxjs";
import {Message} from "../_models/Message";
import {TechItemResearch} from "../_models/TechItemResearch";

@Injectable({
    providedIn: 'root'
})
export class TechService {
    researching: TechItemResearch[] = [];
    lastTime: number = window.performance.now();
    researchComplete = new BehaviorSubject<Message>(null);

    constructor() {
    }

    startResearchUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.researching.forEach(
                (research, key) => {
                    if (research.progress*100 > research.techItem.researchTime) {
                        research.target.push(research.techItem);
                        this.researching.splice(key, 1);
                        this.researchComplete.next({message: 'Research complete: ' + research.techItem.name})
                    } else {
                        research.progress += time - this.lastTime;
                    }
                })
            this.lastTime = time;
        })
    }

    addResearch(target: TechItem[], techItem: TechItem, owner) {
        this.researching.push(
            {
                target: target,
                owner: owner,
                progress: 0,
                techItem: techItem
            }
        )
    }
}
