import FloatingNavbar from "../../../app/layout/FloatingNavbar.tsx";
import {Button, Header, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import TaskDashboard from "./TaskDashboard.tsx";
import {observer} from "mobx-react";
import TaskForm from "../form/TaskForm.tsx";

export default observer(function TaskHome() {
    const {darkModeStore: {isDarkMode}, modalStore} = useStore();
    const handleCreateTaskClick = () => {
        console.log("Opening modal...");
        modalStore.openModal(<TaskForm />);
    };

    return (
        <>
            <FloatingNavbar />
            <Segment basic textAlign='center' style={{ marginTop: '10em' }}>
                <Header as='h2' inverted={isDarkMode}>
                    Create a new task now by clicking the button below
                </Header>
                <Button primary
                        size='huge'
                        inverted={isDarkMode}
                        color={isDarkMode ? 'teal' : 'teal'}
                        circular
                        style={{transition: 'background 0.3s ease'}}
                        onClick={handleCreateTaskClick}
                >
                    Create Task
                </Button>
            </Segment>
            <TaskDashboard/>
        </>
    )
})