import {Injectable} from '@angular/core';
import {MapService} from "./map.service";
import {BattleFront} from "../_classes/BattleFront";
import {Tile} from "../_classes/Tile";

@Injectable({
    providedIn: 'root'
})
export class BattleService {

    constructor(private map: MapService) {
    }

    startBattlesUpdating(logicLoop) {
        logicLoop.subscribe(time => {
            this.map.tiles.forEach(tile => {
                if (tile.armies.length > 1 && this.getEmpireCount(tile) > 1) {
                    tile.armies.filter(army => army.units.length === 0).forEach(army => army.destroy());
                    this.handleBattle(tile);
                }

                if (tile.armies.length > 0 &&
                    (tile.owningEmpire == null ||
                        tile.armies.filter(army => army.units.length > 0).findIndex(army => army.owningEmpire.id == tile.owningEmpire.id) == -1)
                ) {
                    this.handleConquest(tile);
                }
            })
        })
    }

    private handleBattle(tile) {
        //Create army battleFronts
        let battleFronts = [];
        tile.armies.forEach(army => {
            const battleFrontIndex = battleFronts.findIndex(battleFront => battleFront.empireId == army.owningEmpire.id);
            if (battleFrontIndex == -1) {
                battleFronts.push(new BattleFront(army.owningEmpire.id, army.getCommandedUnits()));
            } else {
                battleFronts[battleFrontIndex].addUnits(army.getCommandedUnits());
            }
        });

        //Order them up
        battleFronts.forEach(battleFront => battleFront.getOrderOfBattle());

        //Then have them fight
        this.fight(battleFronts);
    }

    private fight(battleFronts: BattleFront[]) {
        let ranges = [];
        battleFronts.forEach(battleFront => battleFront.commandedUnits.forEach(unit => ranges[unit.stats.range] = unit.stats.range));
        ranges.sort((a, b) => b - a);

        ranges.forEach(range => {
            battleFronts.forEach(battleFront => {
                if (battleFront.orderOfBattle[range] !== undefined) {
                    let battleFront2Index = battleFronts.findIndex(bf => bf.empireId !== battleFront.empireId);
                    if (battleFront2Index == -1) {
                        return;
                    }
                    let battleFront2 = battleFronts[battleFront2Index];

                    battleFront.orderOfBattle[range].forEach(unit => {
                        if (battleFront2.commandedUnits.length == 0) {
                            return;
                        }

                        let attackedUnit = battleFront2.commandedUnits[Math.floor(Math.random() * battleFront2.commandedUnits.length)];
                        attackedUnit.attack(unit.stats.attack);
                        if (attackedUnit.stats.size < 0) {
                            battleFront2.commandedUnits
                                .splice(battleFront2.commandedUnits
                                    .findIndex(unit => unit.id === attackedUnit.id), 1);
                            battleFront2.orderOfBattle[attackedUnit.stats.range]
                                .splice(battleFront2.orderOfBattle[attackedUnit.stats.range]
                                    .findIndex(unit => unit.id === attackedUnit.id), 1);
                            attackedUnit.destroy();
                        }
                    })
                }
            })
        })
    }

    private handleConquest(tile: Tile) {
        if (tile.hasSettlement()) {
            tile.owningEmpire.ownedSettlements.splice(tile.owningEmpire.ownedSettlements.findIndex(ownedSettlement => ownedSettlement.id === tile.getSettlement().id), 1);
            tile.armies[0].owningEmpire.ownedSettlements.push(tile.getSettlement());
        }
        tile.owningEmpire = tile.armies[0].owningEmpire;
        tile.armies[0].owningEmpire.territory.push(tile);
    };

    private getEmpireCount(tile) {
        let empireIds = [];
        tile.armies.forEach(army => {
            if (!empireIds.includes(army.owningEmpire.id)) {
                empireIds.push(army.owningEmpire.id)
            }
        });
        return empireIds.length;
    }

}
