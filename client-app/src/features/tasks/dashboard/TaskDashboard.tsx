import { observer } from 'mobx-react';
import { Grid, Header, Icon, Segment, Button } from 'semantic-ui-react';
import FloatingNavbar from '../../../app/layout/FloatingNavbar.tsx';
import {useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import TaskListItemPlaceholder from "./TaskListItemPlaceholder.tsx";
import {DraggableTaskListContainer} from "./TaskList.tsx";

export default observer(function TaskDashboard() {
    const { darkModeStore: {isDarkMode}, taskStore: {loadTasks, loadingInitial, tasksByStatus} } = useStore();

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const taskSegmentGroupStyle = isDarkMode ?
        { background: '#ffffff'} :
        { background: 'linear-gradient(to bottom right, #000000, #404040)'};

    return (
        <>
            <FloatingNavbar />
            <Segment basic textAlign='center' style={{ marginTop: '2em' }}>
                <Header as='h2' inverted={isDarkMode}>
                    Create a new task now by clicking the button below
                </Header>
                <Button primary size='huge' inverted={isDarkMode} color={isDarkMode ? 'teal' : 'teal'} circular>
                    Create Task
                </Button>
            </Segment>

            <Grid container stackable centered>
                <Grid.Row columns={3}>
                    {/* Task Column */}
                    <Grid.Column>
                        <Segment.Group raised style={taskSegmentGroupStyle}>
                            <Segment
                                textAlign='center'
                                attached='top'
                                inverted={!isDarkMode}
                                color={!isDarkMode ? 'teal' : 'teal'}
                            >
                                <Header as='h1'>
                                    <Icon name='tasks' />
                                    <Header.Content>Tasks</Header.Content>
                                </Header>
                            </Segment>
                            <Segment raised attached='top'>
                                {loadingInitial && tasksByStatus.todo.length === 0 ? (
                                    <>
                                        <TaskListItemPlaceholder/>
                                        <TaskListItemPlaceholder/>
                                    </>
                                ) : (
                                    <DraggableTaskListContainer tasks={tasksByStatus.todo}/>
                                )}
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>

                    {/* Doing Column */}
                    <Grid.Column>
                        <Segment.Group raised style={taskSegmentGroupStyle}>
                            <Segment
                                textAlign='center'
                                attached='top'
                                inverted={!isDarkMode}
                                color={!isDarkMode ? 'red' : 'red'}
                            >
                                <Header as='h1'>
                                    <Icon name='step forward' />
                                    <Header.Content>Doing</Header.Content>
                                </Header>
                            </Segment>
                            <Segment raised attached='top'>
                                {loadingInitial && tasksByStatus.doing.length === 0 ? (
                                    <>
                                        <TaskListItemPlaceholder/>
                                        <TaskListItemPlaceholder/>
                                    </>
                                ) : (
                                    <DraggableTaskListContainer tasks={tasksByStatus.doing}/>
                                )}
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>

                    {/* Done Column */}
                    <Grid.Column>
                        <Segment.Group raised style={taskSegmentGroupStyle}>
                            <Segment
                                textAlign='center'
                                attached='top'
                                inverted={!isDarkMode}
                                color={!isDarkMode ? 'green' : 'green'}
                            >
                                <Header as='h1'>
                                    <Icon name='check' />
                                    <Header.Content>Done</Header.Content>
                                </Header>
                            </Segment>
                            <Segment raised attached='top'>
                                {loadingInitial && tasksByStatus.done.length === 0 ? (
                                    <>
                                        <TaskListItemPlaceholder/>
                                        <TaskListItemPlaceholder/>
                                    </>
                                ) : (
                                    <DraggableTaskListContainer tasks={tasksByStatus.done}/>
                                )}
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
});
