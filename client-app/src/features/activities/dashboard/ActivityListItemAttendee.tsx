import { observer } from 'mobx-react-lite';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/Profile';
import { Link } from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';


interface Props {
    attendees : Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                    <Image size='mini' circular src={'/assets/user.png' || attendee.image} />
                </List.Item>
                }>

                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>

                </Popup>
            
            ))}
        </List>
    )
})