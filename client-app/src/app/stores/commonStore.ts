import {ServerError} from "../models/serverError";
import {makeAutoObservable, reaction} from "mobx";
import {store} from "./store.ts";

export default class CommonStore {
    // This is where we define the state of our application e.g token, error, etc
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt'); // This will get the token from the local storage
    isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';
    appLoaded = false;

    // This is the constructor that will make all properties observable
    constructor() {
        makeAutoObservable(this); // This will make all properties observable

        // This will run the code inside the callback function when the token changes
        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    localStorage.setItem('jwt', token);
                    this.setIsLoggedIn(true); // Update isLoggedIn when the token is present
                } else {
                    localStorage.removeItem('jwt');
                    this.setIsLoggedIn(false); // Update isLoggedIn when the token is removed
                    store.userStore.logout(); // This will logout the user
                }
            }
        )
    }

    setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
        localStorage.setItem('isLoggedIn', String(value)); // Save isLoggedIn to localStorage
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken (token: string | null) {
        this.token = token; // This will set the token in the state
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}