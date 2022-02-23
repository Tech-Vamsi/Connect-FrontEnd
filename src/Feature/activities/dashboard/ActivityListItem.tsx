import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Image, Label,  Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';
import ActivityListItemAttendee from './ActivityListItemAttendee';
//import { useStore } from '../../../App/stores/store';

interface Props{
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  //const { activityStore } = useStore();
 // const { activitiesByDate } = activityStore;
  return (
    <Card attached='true' style={{width:"400px"}} >
      {activity.isCancelled &&
        <Card.Header  style={{color:'white',backgroundColor:'red'}}>Activity Cancelled</Card.Header>}
      <Image circular src={activity.host?.image ||'/images/avatar/large/matthew.png'} wrapped ui={false} />
    <Card.Content>
        <Card.Header style={{fontFamily:'Segoe UI',fontSize:'1.5rem'}}>{ activity.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description style={{ fontFamily: 'Segoe UI', fontSize: '1.5rem' }}>Hosted by {activity.hostUsername}</Card.Description>
        {activity.isHost && (
          <Card.Content>
          <Card.Description style={{ fontFamily: 'Segoe UI', fontSize: '1.5rem' }}><Label basic color='orange'>You are hosting this activity</Label></Card.Description>
          </Card.Content>
        )}
        {activity.isGoing && !activity.isHost && (
          <Card.Content><Card.Description style={{ fontFamily: 'Segoe UI', fontSize: '1.5rem' }}><Label basic color='green'>You are attending the activity</Label></Card.Description></Card.Content>
        )}
      </Card.Content>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!}/>
      </Segment>
    <Card.Content extra>
    <Link  to={`/activity/${activity.id}`}><Button style={{border:'1px solid',borderColor:'#007FFF',color:'#007FFF',backgroundColor:'white',fontSize:'1rem'}}>View</Button></Link>
    </Card.Content>
  </Card>
  );
}
export default observer(ActivityListItem);
