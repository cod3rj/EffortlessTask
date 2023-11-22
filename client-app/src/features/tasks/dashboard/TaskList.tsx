import { Task } from '../../../app/models/task.ts';
import TaskListItems from './TaskListItems.tsx';
import { observer } from 'mobx-react';

interface Props {
    tasks: Task[];
}

export default observer(function TaskList({ tasks}: Props) {
    return (
        <>
            {tasks.map((task, index) => (
                <TaskListItems key={task.id} task={task} index={index} />
            ))}
        </>
    );
});
