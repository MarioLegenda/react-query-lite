export class Cache<Result> {
    private readonly cache: Record<string, Result> = {};

    constructor() {
        this.cache = {};
    }

    has(key: string): boolean {
        return Boolean(this.cache[key]);
    }

    add(key: string, value: Result) {
        this.cache[key] = value;
    }

    get(key: string): Result {
        return this.cache[key];
    }

    remove(key: string): void {
        delete this.cache[key];
    }
}