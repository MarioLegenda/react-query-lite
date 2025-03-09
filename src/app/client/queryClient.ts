import {Cache} from "./cache";
import {StateMachine} from "../stateMachine/machine";

export class QueryClient {
    public readonly cache = new Cache();
    public readonly stateMachine = new StateMachine();
}