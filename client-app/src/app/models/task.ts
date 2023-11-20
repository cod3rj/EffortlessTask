export interface Task {
    id: number;
    title: string;
    category: string;
    dueDate: Date | null;
    isDoing: boolean;
    isDone: boolean;
    importance: number;
    appUserId: string;
}