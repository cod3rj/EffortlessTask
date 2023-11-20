import {Task} from "../models/task.ts";
import {makeAutoObservable} from "mobx";

export default class TaskStore {
    taskRegistry = new Map<string, Task>();
    selectedTask: Task | undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

}