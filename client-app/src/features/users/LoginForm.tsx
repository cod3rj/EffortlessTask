import {useStore} from "../../app/stores/store.ts";
import {LoadingComponent} from "../../app/layout/LoadingComponent.tsx";
import {Formik, Form} from "formik";
import {Button, Grid, Header, Image, Label, Message, Segment} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import * as Yup from 'yup';

function LoginForm() {
    const { userStore } = useStore();
    const {loading } = userStore;

    if (loading) {
        return <LoadingComponent />;
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email(),
        password: Yup.string().required('Password is required'),
    })

    const handleSubmit = async (
        values: { email: string; password: string },
        actions: { setErrors: (errors: { error: string }) => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            // Add your login logic here
            await userStore.login(values);
            actions.setSubmitting(false);
        } catch (error) {
            actions.setErrors({ error: 'Invalid email or password' });
            actions.setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={{ email: '', password: '', error: null }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {(props) => (
                <Grid style={{ height: '75vh' }} centered verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450, textAlign: 'left' }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='assets/logo.png' /> Sign in to your account
                        </Header>
                        <Form className='ui large form ui form' onSubmit={props.handleSubmit}>
                            <Segment stacked raised>
                                <MyTextInput placeholder='E-mail Address'
                                             name='email'
                                             icon='user'
                                             />
                                <MyTextInput placeholder='Password'
                                             name='password'
                                             type='password'
                                             icon='lock'
                                             />
                                {props.errors.error && (
                                    <Label style={{ marginBottom: 10 }} basic color='red' content={props.errors.error} />
                                )}
                                <Button
                                    loading={props.isSubmitting}
                                    positive
                                    content='Login'
                                    type='submit'
                                    color='teal'
                                    fluid
                                    size='large'
                                    disabled={props.isSubmitting} // Disable the button when submitting
                                />
                            </Segment>
                        </Form>
                        <Message>
                            Don't have an account? <Link to='/register'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            )}
        </Formik>
    );
}

export default observer(LoginForm);
