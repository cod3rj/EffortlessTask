import {Button, Header, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div style={{ height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Image src='assets/notfound.jpg' size='big' centered />
            <Header textAlign='center' size='large'>
                Page Not Found
                <Header.Subheader>
                    Sorry, the page you are looking for does not exist.
                </Header.Subheader>
            </Header>

            <Button primary as={Link} to='/'>
                Go Back Home
            </Button>
        </div>
    )
}