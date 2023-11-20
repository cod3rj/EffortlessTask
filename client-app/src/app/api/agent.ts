import axios, {AxiosError, AxiosResponse} from 'axios';
import { Task } from '../models/task';
import {User, UserFormValues} from "../models/user.ts";
import {store} from "../stores/store.ts";
import {router} from "../router/Routes.tsx";
import {toast} from "react-toastify";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios
const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}
axios.interceptors.response.use(async response => {
    // Simulate a delay of 1 second to provide a more realistic user experience.
    await sleep(1000);

    return response;

}, (error: AxiosError) => {
    // Destructure relevant information from the error response.
    const { data, status, config } = error.response as AxiosResponse;

    // Switch statement to handle different HTTP status codes.
    switch (status) {
        case 400:
            // Handle 400 status errors
            // If it's a 'get' request with a missing id, navigate to the 'not-found' page.
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            // If there are errors in the data response, extract and throw them.
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                // Otherwise, display a generic error message.
                toast.error(data);
            }
            break;
        case 401:
            // Handle 401 status errors
            // Display an 'unauthorized' error message.
            toast.error('unauthorized')
            break;
        case 403:
            // Handle 403 status errors
            // Display a 'forbidden' error message.
            toast.error('forbidden')
            break;
        case 404:
            // Handle 404 status errors
            // Navigate to the 'not-found' page.
            router.navigate('/not-found');
            break;
        case 500:
            // Handle 500 status errors
            // Set the server error in the common store and navigate to the 'server-error' page.
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }

    // Reject the promise with the error to propagate it to the calling code.
    return Promise.reject(error);
})
const Task = {
    list: () => request.get<Task[]>('/Task'),
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user),
}

const agent = {
    Task,
    Account,
}

export default agent;