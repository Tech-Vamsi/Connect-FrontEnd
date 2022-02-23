import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List,Image, Popup } from 'semantic-ui-react';
import { Profile } from '../../../App/Models/Profile';
import ProfileCard from '../../Profiles/ProfileCard';

interface Props{
  attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees}:Props) {
  return (
    <List horizontal>
      {attendees.map((attendee) => {
       return <Popup hoverable
          key={attendee.username}
        trigger={ <List.Item key={attendee.username} as={Link} to={`/profile/${attendee.username}`} >
        <Image size='mini' circular src={attendee.image || "/assets/attendee.png"}></Image>
          </List.Item>}>
          <Popup.Content>
            <ProfileCard profile={attendee}></ProfileCard>
          </Popup.Content>
    </Popup>
  
      })}
     
    </List>
  )
})