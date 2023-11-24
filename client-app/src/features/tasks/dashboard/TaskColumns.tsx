import {observer} from 'mobx-react';
import {Card, Header, Icon, Segment, SemanticCOLORS} from 'semantic-ui-react';
import TaskListItemPlaceholder from './TaskListItemPlaceholder.tsx';
import {useStore} from '../../../app/stores/store.ts';
import {Task} from "../../../app/models/task.ts";
import TaskList from "./TaskList.tsx";
import {Droppable} from "react-beautiful-dnd";

interface Props {
    tasks: Task[];
    columnColor: SemanticCOLORS | undefined;
    columnName: string;
}
const TaskColumns = ({ tasks, columnColor, columnName} : Props) => {
    const { darkModeStore: { isDarkMode }, taskStore: { loadingInitial } } = useStore();

    const taskSegmentGroupStyle = isDarkMode
        ? {
            background: '#ffffff',
            maxHeight: '540px',
            overflowY: 'auto',
            scrollbarColor: 'grey transparent',
            scrollbarWidth: 'thin', // Light grey color for scrollbar thumb in Firefox
            transition: 'background 0.5s ease', // For Firefox
        }
        : {
            background: 'linear-gradient(to bottom right, #000000, #404040)',
            transition: 'background 0.5s ease',
            maxHeight: '540px',
            overflowY: 'auto',
            scrollbarColor: 'grey transparent', // Light grey color for scrollbar thumb in Firefox
            scrollbarWidth: 'thin', // For Firefox
        }

    return (
        <Droppable droppableId={columnName.toLowerCase()} key={columnName.toLowerCase()} type="TASK">
            {(provided) => (
                <Segment.Group raised ref={provided.innerRef} {...provided.droppableProps} >
                    <Segment
                        textAlign='center'
                        attached='top'
                        inverted={!isDarkMode}
                        color={!isDarkMode ? columnColor : columnColor}
                        style={{transition: 'background 0.3s ease'}}
                    >
                        <Header as='h1'>
                            <Icon
                                name={
                                    columnName === 'Tasks' ? 'tasks' : columnName === 'Doing' ? 'step forward' : 'check'
                                }
                            />
                            <Header.Content>{columnName}</Header.Content>
                        </Header>
                    </Segment>
                    <Segment raised attached='top' style={taskSegmentGroupStyle}>
                        {loadingInitial && tasks.length === 0 ? (
                            <>
                                <TaskListItemPlaceholder />
                                <TaskListItemPlaceholder />
                            </>
                        ) : tasks.length > 0 ? (
                            <TaskList tasks={tasks} />
                        ) : (
                            <Card raised fluid>
                                <Card.Content>
                                    <Card.Description as='h3' textAlign='center'>
                                        No tasks found
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                        {provided.placeholder}
                    </Segment>
                </Segment.Group>
            )}
        </Droppable>
    )
}

export default observer(TaskColumns);
