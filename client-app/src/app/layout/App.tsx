import {Outlet, useLocation} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {HomePage} from "../../features/home/HomePage.tsx";
import {ToastContainer} from "react-toastify";
import {useStore} from "../stores/store.ts";
import {useEffect} from "react";
import {observer} from "mobx-react";

const App = () => {
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser();
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);


    return (
        <>
            <ToastContainer position='bottom-right' theme='colored'/>
            {location.pathname === '/' ? <HomePage/> : (
                <>
                    <Container style={{marginTop: '7em'}}>
                        <Outlet/>
                    </Container>
                </>
            )}
        </>
    )
}

export default observer(App);