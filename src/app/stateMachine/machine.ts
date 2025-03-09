import {Data} from "./data";

export class StateMachine {
    stateMachineData: Record<string, Data> = {};

    isEnabled(key: string): boolean {
        return this.stateMachineData[key].enabled;
    }

    create(key: string, data: Data) {
        this.stateMachineData[key] = data;
    }
}