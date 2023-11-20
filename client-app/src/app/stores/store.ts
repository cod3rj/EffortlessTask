import {createContext, useContext} from "react";
import CommonStore from "./commonStore.ts";
import TaskStore from "./taskStore.ts";
import UserStore from "./userStore.ts";
import DarkModeStore from "./darkModeStore.ts";

interface Store {
    taskStore: TaskStore;
    commonStore: CommonStore;
    userStore: UserStore;
    darkModeStore: DarkModeStore;
}

export const store: Store = {
    taskStore: new TaskStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    darkModeStore: new DarkModeStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}