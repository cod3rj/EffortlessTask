import {Button, Grid, Header, Image, Label, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../../app/stores/store.ts";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput.tsx";

function LoginForm() {
    const {userStore } = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required'),
        displayName: Yup.string().required('Display name is required'),
        userName: Yup.string().required('Username is required'),
    })

    const handleSubmit = async (
        values: { email: string; password: string, displayName: string, userName: string },
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
        <Formik initialValues={{email: '', displayName: '', userName: '', password: '', errors: null }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
        >
        {(props) => (
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, textAlign: 'left' }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='assets/logo.png' /> Create your account
                    </Header>
                    <Form className='ui large form ui form' onSubmit={props.handleSubmit}>
                        <Segment stacked raised>
                            <MyTextInput placeholder='Username'
                                         name='userName'
                                         icon='user'
                            />
                            <MyTextInput placeholder='Display Name'
                                         name='displayName'
                                         icon='user'
                            />
                            <MyTextInput placeholder='E-mail Address'
                                         name='email'
                                         icon='user'
                            />
                            <MyTextInput placeholder='Password'
                                         name='password'
                                         type='password'
                                         icon='lock'
                            />
                            {props.errors.errors && (
                                <Label basic color='red' content={props.errors.errors} />
                            )}
                            <Button
                                loading={props.isSubmitting}
                                positive
                                content='Register'
                                type='submit'
                                color='teal'
                                fluid
                                size='large'
                                disabled={props.isSubmitting} // Disable the button when submitting
                            />
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )}
        </Formik>
    )
}

export default observer(LoginForm);