import {Button, Card, Image} from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    },[id,loadActivity])

    if (loadingInitial || !activity) return;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button  as={Link} to={`/manage/${activity.id}`} floated='right' content='Edit' color='blue' />
                    <Button  as={Link} to='/activities' floated='right' content='Cancel' color='blue' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})