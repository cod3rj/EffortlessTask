import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

function LoginForm() {
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='assets/logo.png' /> Create your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' size='large' />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Display Name' size='large' />
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' size='large' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            size='large'
                        />
                        <Button color='teal' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default  LoginForm;