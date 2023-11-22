import {Task, TaskFormValues} from "../models/task.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";

export default class TaskStore {
    taskRegistry = new Map<string, Task>();
    selectedTask: Task | undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Filter tasks based on their status
    get tasksByStatus() {
        const tasks = Array.from(this.taskRegistry.values());
        return {
            todo: tasks.filter(task => !task.isDoing && !task.isDone),
            doing: tasks.filter(task => task.isDoing && !task.isDone),
            done: tasks.filter(task => task.isDone),
        };
    }

    loadTasks = async () => {
        this.loadingInitial = true;
        try {
            const tasks = await agent.Task.list();
            tasks.forEach(task => {
                this.setTask(task);
            })
            runInAction(() => this.loadingInitial = false);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false);
        }
    }

    updateTask = async (task: TaskFormValues) => {
        try {
            await agent.Task.update(task);
            runInAction(() => {
                if (task.id)
                {
                    const updatedTask = {...this.getTask(task.id), ...task};
                    this.taskRegistry.set(task.id, updatedTask as Task);
                    this.selectedTask = updatedTask as Task;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    private getTask = (id: string) => {
        return this.taskRegistry.get(id);
    }

    private setTask = (task: Task) => {
        this.taskRegistry.set(task.id, task);
    }
}