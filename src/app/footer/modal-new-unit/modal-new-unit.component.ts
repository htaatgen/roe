import {Component} from '@angular/core';
import {SelectionService} from "../../_services/selection.service";
import {UnitBlueprint} from "../../_classes/UnitBlueprint";
import {UnitStats} from "../../_classes/UnitStats";

@Component({
    selector: 'app-new-unit',
    templateUrl: './modal-new-unit.component.html',
    styleUrls: ['./modal-new-unit.component.css']
})
export class ModalNewUnitComponent {
    public unit: UnitBlueprint;

    constructor(public selection: SelectionService) {
        this.unit = new UnitBlueprint(this.selection.tile);
    }

    addAttribute(newAttribute) {
        const replacerIndex = this.unit.attributes.findIndex(attribute => newAttribute.type === attribute.type);
        if (replacerIndex !== -1) {
            this.unit.attributes.splice(replacerIndex, 1)
        }
        this.unit.attributes.push(newAttribute);
    }

    listAttributes() {
        let attributes = [];
        this.selection.settlement.value.tile.owningEmpire.techtree.forEach(tech => attributes = attributes.concat(tech.unitAttributes));
        return attributes;
    }

    calculateUnitStats() {
        let stats = new UnitStats();
        stats.attack += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.attack, 0);
        stats.defence += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.defence, 0);
        stats.charge += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.charge, 0);
        stats.range += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.range, 0);
        stats.maxSize += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.maxSize, 0);
        stats.upkeep += this.unit.attributes.reduce((accumulator, attribute) => accumulator + attribute.stats.upkeep, 0);
        return stats;
    }

    addUnit(unitName) {
        this.selection.settlement.value.population.units.push(this.unit);
        this.selection.settlement.next(this.selection.settlement.value);
        this.unit = new UnitBlueprint(this.selection.tile);
    }

}
