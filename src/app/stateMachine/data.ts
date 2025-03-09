export class Data {
    constructor(public enabled?: boolean) {
        if (enabled === undefined) {
            this.enabled = true;
        }
    }
}