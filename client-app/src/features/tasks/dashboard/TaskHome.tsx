import FloatingNavbar from "../../../app/layout/FloatingNavbar.tsx";
import {Button, Header, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import TaskDashboard from "./TaskDashboard.tsx";
import {observer} from "mobx-react";

export default observer(function TaskHome() {
    const {darkModeStore: {isDarkMode}} = useStore();
    return (
        <>
            <FloatingNavbar />
            <Segment basic textAlign='center' style={{ marginTop: '2em' }}>
                <Header as='h2' inverted={isDarkMode}>
                    Create a new task now by clicking the button below
                </Header>
                <Button primary size='huge' inverted={isDarkMode} color={isDarkMode ? 'teal' : 'teal'} circular style={{transition: 'background 0.3s ease'}}>
                    Create Task
                </Button>
            </Segment>
            <TaskDashboard/>
        </>
    )
})