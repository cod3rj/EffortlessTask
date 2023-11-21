import { makeAutoObservable } from 'mobx';

export default class DarkModeStore {
    isDarkMode = false;
    taskDarkMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        // Adjust body styles based on the dark mode state
        document.body.style.background = this.isDarkMode
            ? 'linear-gradient(to bottom right, #000000, #404040)'
            : 'linear-gradient(to bottom right, #FFFFFF, #F0F0F0)';
        document.body.style.color = this.isDarkMode ? '#fff' : '#000';
    }

    toggleTaskDarkMode() {
        this.taskDarkMode = !this.taskDarkMode;
        // Adjust styles for the TaskDashboard based on taskDarkMode state
        // You can customize the colors according to your design
        document.documentElement.style.setProperty('--task-header-background', this.taskDarkMode ? 'skyblue' : 'red');
        document.documentElement.style.setProperty('--task-segment-group-background', this.taskDarkMode ? '#333' : '#ddd');
        document.documentElement.style.setProperty('--task-segment-background', this.taskDarkMode ? '#444' : '#eee');
    }
}

