import { makeAutoObservable } from 'mobx';

export default class DarkModeStore {
    isDarkMode = false;

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
}

