import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../dashboard/ActivityDetail";
import ActivityForm from "../dashboard/Form/ActivityForm";
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity,
    cancelSelectActivity, openForm, closeForm, editMode, createOrEdit, deleteActivity,submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting = {submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm 
                        closeForm={closeForm} 
                        activity={selectedActivity} 
                        createOrEdit={createOrEdit}
                        submitting={submitting} />}
            </Grid.Column>

        </Grid>
    )
}