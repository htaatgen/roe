import {UnitAttribute} from "../_classes/UnitAttribute";

export interface TechItem {
    id: number;
    researchTime: number;
    type: string;
    name: string;
    unitAttributes: UnitAttribute[];
    tileAttributes: any[];
    settlementAttributes:any[];
    empireAttributes:any[];
    requires: number[];
}