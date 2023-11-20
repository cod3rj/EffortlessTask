import FloatingNavbar from "../../../app/layout/FloatingNavbar.tsx";
import {observer} from "mobx-react";
import {Grid} from "semantic-ui-react";

export default observer(function TaskDashboard() {
  return (
    <>
        <FloatingNavbar />
        <Grid>
            <Grid.Column width='10'>
                <h1>Task Dashboard</h1>
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
            <Grid.Column width={10}>
            </Grid.Column>
        </Grid>
    </>
  );
})