import { observer } from 'mobx-react';
import { Card } from 'semantic-ui-react';
import { Task } from '../../../app/models/task.ts';
import { Draggable } from 'react-beautiful-dnd';
import { useStore } from '../../../app/stores/store.ts';

interface Props {
    task: Task;
    index: number;
}

const TaskListItems = ({ task, index }: Props) => {
    const { darkModeStore: { isDarkMode } } = useStore();

    const getCardColor = () => {
        const importanceNumber = task.importance ?? 1;
        switch (importanceNumber) {
            case 1: return 'green';
            case 2: return 'yellow';
            case 3: return 'red';
            default: return 'green';
        }
    };

    const getCardGradient = () => {
        return isDarkMode
            ? 'linear-gradient(to bottom right, #ffffff, #add8e6)'
            : '#ffffff';
    };

    // Helper function to get the label for importance
    const getImportanceLabel = (importance: number) => {
        switch (importance) {
            case 1: return 'Low';
            case 2: return 'Medium';
            case 3: return 'High';
            default: return 'Low';
        }
    };

    return (
        console.log('Task ID:', task.id),
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Card.Group>
                        <Card
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
                                <Card.Meta>Importance: {getImportanceLabel(task.importance!)}</Card.Meta>
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
