import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./homePage.css";
import {useStore} from "../../app/stores/store.ts";

export const HomePage = () => {
    const {userStore} = useStore();

    return (
        <>
            <div className="blob">
            <Segment inverted textAlign="center" vertical className="homePageStyle">
                <Container text>
                    <Header as="h1" inverted>
                        <Image src="/assets/logo.png" alt="logo" size="massive" style={{ marginBottom: 12 }} />
                        Effortless Task
                    </Header>
                    {userStore.isLoggedIn ? (
                        <>
                            <Button as={Link} to="/task" size="huge" inverted>
                                Go to Tasks!
                            </Button>
                        </>
                    ) : (
                        <>
                            <Header as="h2" inverted content="Welcome to Effortless Tasks" />
                            <Button as={Link} to="/login" size="huge" inverted>
                                Start Logging In
                            </Button>
                        </>
                    )}
                </Container>
            </Segment>
            </div>
        </>
    );
};