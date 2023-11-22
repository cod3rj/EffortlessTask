import { observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';
import { Task } from '../../../app/models/task.ts';
import { Draggable } from 'react-beautiful-dnd';
import {useStore} from "../../../app/stores/store.ts";

interface Props {
    task: Task;
    index: number;
}

const TaskListItems = ({ task, index }: Props) => {
    const {darkModeStore: { isDarkMode } } = useStore();
    const getCardColor = () => {
        // Determine the color based on importance level
        switch (task.importance) {
            case 1: // Medium
                return 'yellow';
            case 2: // High
                return 'red';
            default:
                return 'green';
        }
    };

    const getCardGradient = () => {
        // Return gradient for dark mode, or white background for light mode
        return isDarkMode
            ? 'linear-gradient(to bottom right, #ffffff, #add8e6)' // Example gradient from white to light blue
            : '#ffffff';
    };

    return (
        <Draggable draggableId={task.id.toString()} key={task.id.toString()} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Card.Group>
                        <Card key={task.id}
                              raised
                              fluid
                              color={getCardColor()}
                              style={{
                                  background: isDarkMode ? 'lightgrey' : getCardGradient(),
                                  transition: 'background 0.3s ease',
                              }}
                        >
                            <Card.Content>
                                <Card.Header>{task.title}</Card.Header>
                                <Card.Meta>Importance: {task.importance}</Card.Meta>
                                <Card.Description>Category: {task.category}</Card.Description>
                                <Card.Description>
                                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </div>
            )}
        </Draggable>
    );
};

export default observer(TaskListItems);
