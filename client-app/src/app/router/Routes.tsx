import App from "../layout/App.tsx";
import {createBrowserRouter, RouteObject} from "react-router-dom";
import {NotFound} from "../../features/common/NotFound.tsx";
import LoginForm from "../../features/users/LoginForm.tsx";
import RegisterForm from "../../features/users/RegisterForm.tsx";
import TaskHome from "../../features/tasks/dashboard/TaskHome.tsx";
import AuthenticatedRoute from "./AuthenticationRoute.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <LoginForm />,
            },
            {
                path: 'register',
                element: <RegisterForm />,
            },
            {
                path: 'task',
                element: (
                    <AuthenticatedRoute element={<TaskHome />} />
                ),
            },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <div>Server Error</div> },
            { path: '*', element: <NotFound /> },
        ],
    },
];

export const router = createBrowserRouter(routes);