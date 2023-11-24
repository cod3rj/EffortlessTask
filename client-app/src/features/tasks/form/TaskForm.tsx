import {observer} from "mobx-react";
import {useStore} from "../../../app/stores/store.ts";
import {TaskFormValues} from "../../../app/models/task.ts";
import {useEffect, useState} from "react";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {LoadingComponent} from "../../../app/layout/LoadingComponent.tsx";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput.tsx";
import MyDateInput from "../../../app/common/form/MyDateInput.tsx";
import MySelectInput from "../../../app/common/form/MySelectInput.tsx";
import importanceOptions from "../../../app/common/options/importanceOptions.ts";


interface Props {
    taskId?: string;
}
export default observer(function TaskForm({ taskId } : Props) {
    const {taskStore, modalStore} = useStore();
    const {createTask, updateTask, loadTask, loadingInitial, generateUniqueId} = taskStore;
    const navigate = useNavigate();
    const [task, setTask] = useState<TaskFormValues>(new TaskFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),
        dueDate: Yup.string().required('Date is required').nullable(),
        importance: Yup.string().required(),
    })

    useEffect(() => {
        console.log('Received Task ID:', taskId);
        if (taskId) {
            loadTask(taskId).then((task) => {
                setTask(new TaskFormValues(task))
            })
        }
    }, [loadTask, taskId]);

    const handleFormSubmit = (task: TaskFormValues) => {
        if (!task.id) {
            const newTask = {
                ...task,
                id: generateUniqueId()
            }
            createTask(newTask).then(() => navigate(`/task`));
        } else {
            updateTask(task).then(() => navigate(`/task`));
        }
    }

    if (loadingInitial) <LoadingComponent content='Loading task...'/>

    return (
        <Segment clearing className='task-form' raised>
            <Header content='Task Details' sub color='teal'/>
            <Formik initialValues={task}
                    onSubmit={values => handleFormSubmit(values)}
                    validationSchema={validationSchema}
                    enableReinitialize
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title' icon='pencil alternate'/>
                        <MyTextInput placeholder='Category' name='category' icon='pencil alternate'/>
                        <MyDateInput placeholderText='Due Date'
                                     name='dueDate'
                                     showTimeSelect
                                     timeCaption='time'
                                     dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MySelectInput placeholder='Importance' name='importance' options={importanceOptions} />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting}
                                floated='right'
                                positive
                                type='submit'
                                content='Submit'/>
                        <Button onClick={() => {
                            modalStore.closeModal();
                            navigate('/task');
                            }}
                                floated='right'
                                type='button'
                                content='Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})