import {Unit} from "./Unit";

export class BattleFront {
    empireId: number;
    commandedUnits: Unit[] = [];
    orderOfBattle: any[] = [];

    constructor(empireId, units: Unit[] = []) {
        this.empireId = empireId;
        if(units.length > 0){
            this.addUnits(units);
        }
    }

    getOrderOfBattle() {
        this.commandedUnits.forEach((unit: Unit) => {
            if (this.orderOfBattle[unit.stats.range] == undefined) {
                this.orderOfBattle[unit.stats.range] = [];
            }
            this.orderOfBattle[unit.stats.range].push(unit);
        });
    }

    addUnits(units:Unit[]){
        this.commandedUnits = this.commandedUnits.concat(units);
    }
}