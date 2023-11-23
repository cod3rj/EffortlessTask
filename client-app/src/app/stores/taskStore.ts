import {Task, TaskFormValues, TaskModel} from "../models/task.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {store} from "./store.ts";

export default class TaskStore {
    taskRegistry = new Map<string, Task>();
    selectedTask: Task | undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

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

    loadTask = async (id: string) => {
        let task = this.getTask(id);
        if (task) {
            this.selectedTask = task;
            return task;
        } else {
            this.loadingInitial = true;
            try {
                task = await agent.Task.details(id);
                this.setTask(task);
                runInAction(() => {
                    this.selectedTask = task
                    this.loadingInitial = false;
                });
                return task;
            } catch (error) {
                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }
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

    createTask = async (task: TaskFormValues) => {
        try {
            await agent.Task.create(task);
            const newTask = new TaskModel(task);
            this.setTask(newTask);
            // Now that the task is created, update the MobX store
            runInAction(() => {
                this.selectedTask = newTask;
            });
            store.modalStore.closeModal(); // This will close the modal after the user has logged in
        } catch (error) {
            console.error(error);
        }
    }

    generateUniqueId = () => {
        // This uses a random number and checks if it's already in use
        let newId;
        do {
            newId = Math.floor(Math.random() * 1000) + 1; // Replace this with your preferred method
        } while (Array.from(this.taskRegistry.keys()).includes(newId.toString())); // Check if the ID is already in use

        return newId.toString();
    };

    private getTask = (id: string) => {
        return this.taskRegistry.get(id);
    }

    private setTask = (task: Task) => {
        this.taskRegistry.set(task.id, task);
    }
}