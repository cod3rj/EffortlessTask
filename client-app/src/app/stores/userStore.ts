import {User, UserFormValues} from "../models/user.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {store} from "./store.ts";
import {router} from "../router/Routes.tsx";

export default class UserStore {
    user: User | null = null;
    loading = false;
    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn () {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        this.loading = true; // This will set the loading state to true
        try {
            const user = await agent.Account.login(creds); // This will call the login method in the agent.ts file and pass the creds
            store.commonStore.setToken(user.token); // This will set the token in the local storage
            runInAction(() => this.user = user); // This will set the user in the state
            runInAction(() => this.loading = false); // This will set the loading state to false
            router.navigate('/task'); // This will redirect the user to the activities page

        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false); // This will set the loading state to false
        }
    }

    register = async (creds: UserFormValues) => {
        const user = await agent.Account.register(creds); // This will call the register method in the agent.ts file and pass the creds
        store.commonStore.setToken(user.token); // this will set the token in the local storage
        runInAction(() => this.user = user); // This will set the user in the state
        router.navigate('/task'); // This will redirect the user to the activities page after registering
    }

    logout = async () => {
        store.commonStore.setToken(null); // This will remove the token from the local storage
        this.user = null; // This will remove the token from the state
        router.navigate('/'); // This will redirect the user to the home page
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current(); // This will call the current method in the agent.ts file
            runInAction(() => this.user = user); // This will set the user in the state
        } catch (error) {
            console.log(error);
        }
    }
}