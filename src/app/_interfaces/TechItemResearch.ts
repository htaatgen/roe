import {TechItem} from "./TechItem";

export interface TechItemResearch {
    target: TechItem[],
    owner: any,
    progress: number,
    techItem: TechItem
}