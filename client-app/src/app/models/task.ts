export interface Task {
    id: string;
    title: string;
    category: string;
    dueDate: Date | null;
    isDoing: boolean;
    isDone: boolean;
    importance: ImportanceLevel | null;
    appUserId: string;
}

export class TaskModel implements Task {
    id: string = '';
    title: string = '';
    category: string = '';
    dueDate: Date | null = null;
    isDoing: boolean = false;
    isDone: boolean = false;
    importance: ImportanceLevel | null = null;
    appUserId: string = '';

    constructor(init?: Task) {
        Object.assign(this, init);
    }
}

export class TaskFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    dueDate: Date | null = null;
    isDoing: boolean = false;
    isDone: boolean = false;
    importance: ImportanceLevel | null = null;
    appUserId: string = '';

    constructor(task?: TaskFormValues) {
        if (task) {
            this.id = task.id;
            this.title = task.title;
            this.category = task.category;
            this.dueDate = task.dueDate;
            this.isDoing = task.isDoing;
            this.isDone = task.isDone;
            this.importance = task.importance;
            this.appUserId = task.appUserId;
        }
    }
}

export enum ImportanceLevel {
    Low = 1,
    Medium = 2,
    High = 3,
}
