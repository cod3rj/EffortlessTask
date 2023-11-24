import { observer } from 'mobx-react';
import { Grid } from 'semantic-ui-react';
import { store, useStore } from "../../../app/stores/store.ts";
import { useEffect } from "react";
import TaskColumns from "./TaskColumns.tsx";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export default observer(function TaskDashboard() {
    const { taskStore: { loadTasks, tasksByStatus } } = useStore();

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleDragDrop = (results: DropResult) => {
        console.log(results);

        const { source, destination } = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (!tasksByStatus[source.droppableId] || !tasksByStatus[destination.droppableId]) return;

        const draggedTask = tasksByStatus[source.droppableId][source.index];

        console.log(`Moving task from ${source.droppableId} to ${destination.droppableId}`);

        if (source.droppableId === 'todo' && destination.droppableId === 'doing') {
            draggedTask.isDoing = true;
        } else if (source.droppableId === 'doing' && destination.droppableId === 'todo') {
            draggedTask.isDoing = false;
        } else if (source.droppableId === 'doing' && destination.droppableId === 'done') {
            draggedTask.isDoing = false;
            draggedTask.isDone = true;
        } else if (source.droppableId === 'done' && destination.droppableId === 'doing') {
            draggedTask.isDoing = true;
            draggedTask.isDone = false;
        } else if (source.droppableId === 'done' && destination.droppableId === 'todo') {
            draggedTask.isDoing = false;
            draggedTask.isDone = false;
        } else {
            console.log('Unsupported move');
            return;
        }

        store.taskStore.updateTask(draggedTask);

        console.log('Task updated successfully');
    }

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <Grid container stackable centered>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.todo} columnColor='teal' columnName='Todo' />
                    </Grid.Column>
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.doing} columnColor='red' columnName='Doing' />
                    </Grid.Column>
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.done} columnColor='green' columnName='Done' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </DragDropContext>
    )
})
