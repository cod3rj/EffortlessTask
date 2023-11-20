import {Outlet, useLocation} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {HomePage} from "../../features/home/HomePage.tsx";
import {ToastContainer} from "react-toastify";

const App = () => {
    const location = useLocation();

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

export default App;