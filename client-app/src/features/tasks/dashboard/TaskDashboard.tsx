import {observer} from 'mobx-react';
import {Grid} from 'semantic-ui-react';
import {store, useStore} from "../../../app/stores/store.ts";
import {useEffect} from "react";
import TaskColumns from "./TaskColumns.tsx";
import {DragDropContext} from 'react-beautiful-dnd';


export default observer(function TaskDashboard() {
    const {taskStore: { loadTasks, tasksByStatus } } = useStore();

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleDragDrop = (results) => {
        console.log(results); // Log the results to inspect in the console

        const { source, destination, type } = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Check if the key exists before accessing it
        if (!tasksByStatus[source.droppableId] || !tasksByStatus[destination.droppableId]) return;

        // Retrieve the dragged task
        const draggedTask = tasksByStatus[source.droppableId][source.index];

        // Handle logic based on the source and destination columns
        console.log(`Moving task from ${source.droppableId} to ${destination.droppableId}`);

        if (source.droppableId === 'todo' && destination.droppableId === 'doing') {
            // Moving from Task to Doing
            draggedTask.isDoing = true;
        } else if (source.droppableId === 'doing' && destination.droppableId === 'todo') {
            // Moving from Doing to Task
            draggedTask.isDoing = false;
        } else if (source.droppableId === 'doing' && destination.droppableId === 'done') {
            // Moving from Doing to Done
            draggedTask.isDoing = false;
            draggedTask.isDone = true;
        } else if (source.droppableId === 'done' && destination.droppableId === 'doing') {
            // Moving from Done to Doing
            draggedTask.isDoing = true;
            draggedTask.isDone = false;
        } else if (source.droppableId === 'done' && destination.droppableId === 'todo') {
            // Moving from Done to Task
            draggedTask.isDoing = false;
            draggedTask.isDone = false;
        } else {
            console.log('Unsupported move');
            return;
        }

        // Perform the update in your MobX store
        store.taskStore.updateTask(draggedTask);

        console.log('Task updated successfully');
    }

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <Grid container stackable centered>
                <Grid.Row columns={3}>
                    {/* Task Column */}
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.todo} columnColor='teal' columnName='Todo' />
                    </Grid.Column>

                    {/* Doing Column */}
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.doing} columnColor='red' columnName='Doing' />
                    </Grid.Column>

                    {/* Done Column */}
                    <Grid.Column>
                        <TaskColumns tasks={tasksByStatus.done} columnColor='green' columnName='Done' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </DragDropContext>
    );
});
