import { useEffect } from 'react';
import { useStore } from '../stores/store.ts';
import { useNavigate } from 'react-router-dom';
import {observer} from "mobx-react";

const AuthenticatedRoute = ({ element: Element }: { element: JSX.Element }) => {
    const { userStore } = useStore();
    const navigate = useNavigate();

    // Redirect to login if not logged in
    useEffect(() => {
        if (!userStore.isLoggedIn) {
            navigate('/login');
        }
    }, [userStore.isLoggedIn, navigate]);

    return userStore.isLoggedIn ? Element : null;
};

export default observer(AuthenticatedRoute);
