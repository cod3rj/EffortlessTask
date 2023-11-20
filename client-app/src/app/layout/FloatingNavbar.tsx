import {Link} from 'react-router-dom';
import {Button, Dropdown, Image, Menu} from 'semantic-ui-react';
import {useStore} from '../stores/store.ts';
import './navbarStyles.css';
import {observer} from "mobx-react"; // Import your custom CSS file for styling

const FloatingNavbar = () => {
    const { userStore: { user, logout }, darkModeStore } = useStore();

    const navbarStyle = {
        background: darkModeStore.isDarkMode
            ? 'linear-gradient(to bottom right, #000000, #0077cc 65%)'
            : 'linear-gradient(to bottom right, #000000, #404040)',
    };

    return (
        <Menu inverted fixed="top" style={navbarStyle}>
            <Menu.Item as={Link} to="/">
                <Image src="/assets/logo.png" size="mini" style={{ marginRight: '1.5em' }} />
                Effortless Tasks
            </Menu.Item>

            <Menu.Item as={Link} to="/tasks">
                Tasks
            </Menu.Item>

            <Menu.Item position="right" className="custom-width-menu-item">
                <Button
                    icon={darkModeStore.isDarkMode ? 'moon' : 'sun'}
                    toggle
                    active={darkModeStore.isDarkMode}
                    onClick={() => darkModeStore.toggleDarkMode()}
                    style={{ marginRight: '1.5em' }}
                />
                <Image src='./assets/user.png' avatar spaced='right' />
                <Dropdown pointing='top left' text={user?.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    );
};

export default observer(FloatingNavbar);
