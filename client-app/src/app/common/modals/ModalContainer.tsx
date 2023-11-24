import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store";
import {Modal} from "semantic-ui-react";

export default observer(function ModalContainer() {
    const {modalStore, darkModeStore} = useStore();
    const {modal, closeModal} = modalStore;

    const invertedColors = darkModeStore.isDarkMode
            ? {background: 'skyblue', border: '1px solid black', color: 'white'}
            : {background: '#ffffff'};

    const contentColor = darkModeStore.isDarkMode
        ? {background: 'lightblue', border: '1px solid black'}
        : {background: '#ffffff'};

    return(
        <Modal open={modal.open} onClose={closeModal} size='mini'>
            <Modal.Header style={invertedColors}>Create a Task</Modal.Header>
            <Modal.Content style={contentColor}>
                {modal.body}
            </Modal.Content>
            <Modal.Actions style={invertedColors}/>
        </Modal>
    )
})