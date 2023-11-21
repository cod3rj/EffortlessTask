// TaskList.tsx

import {observer} from 'mobx-react';
import {Card} from 'semantic-ui-react';
import {useDrag, useDrop} from 'react-dnd';
import {Task} from '../../../app/models/task.ts';
import {store} from "../../../app/stores/store.ts";

interface DraggableTaskProps {
    task: Task;
}

const DraggableTask: React.FC<DraggableTaskProps> = observer(({ task }) => {
    const [, drag] = useDrag({
        type: 'TASK',
        item: { task },
    });

    return (
        <div ref={drag} style={{ cursor: 'move', marginBottom: '10px' }}>
            <Card key={task.id}>
                <Card.Content>
                    <Card.Header>{task.title}</Card.Header>
                    <Card.Meta>Importance: {task.importance}</Card.Meta>
                    <Card.Description>Category: {task.category}</Card.Description>
                    <Card.Description>
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
});

interface TaskListProps {
    tasks: Task[];
}

const DraggableTaskList: React.FC<TaskListProps> = observer(({ tasks }) => {
    return (
        <>
            {tasks && tasks.length > 0 && tasks.map((task) => (
                <DraggableTask key={task.id} task={task} />
            ))}
        </>
    );
});

export const DraggableTaskListContainer: React.FC<TaskListProps> = observer(({ tasks }) => {
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item: any) => {
            const draggedTask = item.task;

            if (draggedTask.isDoing !== undefined && draggedTask.isDone !== undefined) {
                // Check the source and destination columns
                const isTaskColumn = !draggedTask.isDoing && !draggedTask.isDone;
                const isDoingColumn = draggedTask.isDoing && !draggedTask.isDone;
                const isDoneColumn = draggedTask.isDone;

                // Handle logic based on the source and destination columns
                if (isTaskColumn) {
                    // Moving from Task to Doing
                    draggedTask.isDoing = true;
                } else if (isDoingColumn) {
                    // Moving from Doing to Done
                    draggedTask.isDoing = false;
                    draggedTask.isDone = true;
                } else if (isDoneColumn) {
                    // Moving from Done to Task
                    draggedTask.isDone = false;
                }
            }

            // Perform the update in your MobX store
            store.taskStore.updateTask(draggedTask);
        },
    });

    return (
        <div ref={drop}>
            <DraggableTaskList tasks={tasks} />
        </div>
    );
});



