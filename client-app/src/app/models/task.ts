import {format} from 'date-fns';

export interface Task {
    id: string;
    title: string;
    category: string;
    dueDate: Date | null;
    formattedDueDate: string;
    isDoing: boolean;
    isDone: boolean;
    importance: number | null; // Change ImportanceLevel to number
    appUserId: string;
}

export class TaskModel implements Task {
    id: string = '';
    title: string = '';
    category: string = '';
    dueDate: Date | null = null;
    formattedDueDate: string = '';
    isDoing: boolean = false;
    isDone: boolean = false;
    importance: number | null = null; // Change ImportanceLevel to number
    appUserId: string = '';

    constructor(init?: Task) {
        Object.assign(this, init);
        this.dueDate = init?.dueDate ? new Date(init.dueDate) : null;
        this.formattedDueDate = init?.dueDate ? format(init.dueDate, 'MMMM d, yyyy h:mm aa') : 'No due date';
    }
}

export class TaskFormValues {
    id: string = '';
    title: string = '';
    category: string = '';
    dueDate: Date | null = null;
    formattedDueDate: string = '';
    isDoing: boolean = false;
    isDone: boolean = false;
    importance: number | null = null; // Change ImportanceLevel to number
    appUserId: string = '';

    constructor(task?: TaskFormValues) {
        if (task) {
            this.id = task.id;
            this.title = task.title;
            this.category = task.category;
            if (task?.dueDate) {
                if (task.dueDate instanceof Date) {
                    this.dueDate = task.dueDate;
                } else {
                    // Handle the case where it's not a Date (e.g., parse it)
                    this.dueDate = new Date(task.dueDate);
                }
                this.formattedDueDate = format(this.dueDate, 'MMMM d, yyyy h:mm aa');
            } else {
                this.dueDate = null;
                this.formattedDueDate = 'No due date';
            }
            this.isDoing = task.isDoing;
            this.isDone = task.isDone;
            this.importance = task.importance;
            this.appUserId = task.appUserId;
        }
    }
}

