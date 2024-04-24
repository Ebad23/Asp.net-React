import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/loadingcomponent";

export default observer(function ProfilePage() {

    const {profileStore} = useStore();
    const {username} = useParams<{username: string}>();
    const {loadingProfile,loadProfile,profile} = profileStore;

    useEffect(() => {
        if (username) loadProfile(username);
    },[loadProfile,username])

    if (loadingProfile) return <LoadingComponent content='Loading profile... '/>

    if (!profile) return <h2>Problem loading profile</h2>

    return(
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!}/>
                <ProfileContent profile={profile!} />
            </Grid.Column>
        </Grid>
    )
})