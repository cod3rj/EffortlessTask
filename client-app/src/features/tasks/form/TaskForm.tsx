import {observer} from "mobx-react";
import {useStore} from "../../../app/stores/store.ts";
import {TaskFormValues} from "../../../app/models/task.ts";
import {useEffect, useState} from "react";
import * as Yup from 'yup';
import { useNavigate, useParams} from "react-router-dom";
import {LoadingComponent} from "../../../app/layout/LoadingComponent.tsx";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput.tsx";
import MyDateInput from "../../../app/common/form/MyDateInput.tsx";
import MySelectInput from "../../../app/common/form/MySelectInput.tsx";
import importanceOptions from "../../../app/common/options/importanceOptions.ts";

export default observer(function TaskForm() {
    const {taskStore, modalStore} = useStore();
    const {createTask, updateTask, loadTask, loadingInitial, generateUniqueId} = taskStore;
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [task, setTask] = useState<TaskFormValues>(new TaskFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The task title is required'),
        category: Yup.string().required(),
        dueDate: Yup.string().required('Date is required').nullable(),
        importance: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadTask(id).then(task => setTask(new TaskFormValues(task)))
    }, [id, loadTask]);

    const handleFormSubmit = (task: TaskFormValues) => {
        if (!task.id) {
            const newTask = {
                ...task,
                id: generateUniqueId()
            }
            createTask(newTask).then(() => navigate(`/task`));
        } else {
            updateTask(task).then(() => navigate(`/task/${task.id}`));
        }
    }

    if (loadingInitial) <LoadingComponent content='Loading task...'/>

    return (
        <Segment clearing>
            <Header content='Task Details' sub color='teal'/>
            <Formik initialValues={task}
                    onSubmit={values => handleFormSubmit(values)}
                    validationSchema={validationSchema}
                    enableReinitialize
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title' icon=''/>
                        <MyTextInput placeholder='Category' name='category' icon=''/>
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