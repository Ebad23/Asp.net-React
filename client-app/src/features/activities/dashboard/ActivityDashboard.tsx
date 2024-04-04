import { Grid } from "semantic-ui-react";
import ActivityDetails from "../dashboard/ActivityDetail";
import ActivityForm from "../dashboard/Form/ActivityForm";
import ActivityList from './ActivityList';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails /> }
                {activityStore.editMode &&
                    <ActivityForm  />}
            </Grid.Column>

        </Grid>
    )

})
