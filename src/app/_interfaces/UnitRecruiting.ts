import {UnitBlueprint} from "../_classes/UnitBlueprint";
import {Army} from "../_classes/Army";

export interface UnitRecruiting {
    target: Army,
    progress: number,
    unitBlueprint: UnitBlueprint
}