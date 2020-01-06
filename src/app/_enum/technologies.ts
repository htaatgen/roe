import {TechItem} from "../_interfaces/TechItem";
import {UnitAttribute} from "../_classes/UnitAttribute";
import {UnitStats} from "../_classes/UnitStats";

export class TechnologiesEnum {
    technologies: TechItem[] = [
        {
            id: 0,
            researchTime: 10000,
            type: 'general',
            name: 'Starting Tech',
            unitAttributes: [
                new UnitAttribute('Spear', 'weapon', new UnitStats(1, 0, 0, 1, 0, 10)),
                new UnitAttribute('Club', 'weapon', new UnitStats(1, 0, 0, 0, 0, 0))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: []
        },
        {
            id: 1,
            researchTime: 10000,
            type: 'material',
            name: 'Copperworking',
            unitAttributes: [
                new UnitAttribute('Copper spear', 'weapon', new UnitStats(3, 0, 0, 1, 0, 20, 20)),
                new UnitAttribute('Copper axe', 'weapon', new UnitStats(4, 0, 0, 0, 0, 20, 20))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: []
        }, {
            id: 2,
            researchTime: 15000,
            type: 'material',
            name: 'Ironworking',
            unitAttributes: [
                new UnitAttribute('Iron spear', 'weapon', new UnitStats(4, 0, 0, 1, 0, 20, 20)),
                new UnitAttribute('Iron axe', 'weapon', new UnitStats(4, 0, 0, 0, 0, 20, 20))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: [1]
        }, {
            id: 3,
            researchTime: 20000,
            type: 'material',
            name: 'Steelworking',
            unitAttributes: [
                new UnitAttribute('Steel spear', 'weapon', new UnitStats(5, 0, 0, 1, 0, 30, 30)),
                new UnitAttribute('Steel axe', 'weapon', new UnitStats(5, 0, 0, 0, 0, 30, 30))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: [2]
        }, {
            id: 4,
            researchTime: 10000,
            type: 'weapon',
            name: 'Shortswords',
            unitAttributes: [
                new UnitAttribute('Copper short sword', 'weapon', new UnitStats(3, 2, 0, 0, 0, 30, 30)),
                new UnitAttribute('Iron short sword', 'weapon', new UnitStats(4, 3, 0, 0, 0, 50, 50, 100,[2])),
                new UnitAttribute('Steel short sword', 'weapon', new UnitStats(4, 3, 0, 0, 0, 50, 50, 100,[3]))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: [1]
        }, {
            id: 5,
            researchTime: 10000,
            type: 'weapon',
            name: 'Longswords',
            unitAttributes: [
                new UnitAttribute('Copper longsword', 'weapon', new UnitStats(3, 2, 0, 0, 0, 30)),
                new UnitAttribute('Iron longsword', 'weapon', new UnitStats(4, 3, 0, 0, 0, 50, 50, 100,[2])),
                new UnitAttribute('Steel longsword', 'weapon', new UnitStats(4, 3, 0, 0, 0, 50, 50, 100,[3]))
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: [2, 4]
        }, {
            id: 6,
            researchTime: 10000,
            type: 'shield',
            name: 'Round Shield',
            unitAttributes: [
                new UnitAttribute('Wood round shield', 'shield', new UnitStats(0, 2, 0, 0, 0, 30)),
                new UnitAttribute('Iron round shield', 'shield', new UnitStats(0, 3, 0, 0, 0, 30, 30, 100,[2])),
                new UnitAttribute('Steel round shield', 'shield', new UnitStats(0, 4, 0, 0, 0, 30, 30, 100,[3])),
            ],
            tileAttributes: [],
            settlementAttributes: [],
            empireAttributes: [],
            requires: [1]
        }
    ];

}