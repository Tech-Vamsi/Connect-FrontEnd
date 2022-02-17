import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../App/Models/Activity';
//import { useStore } from '../../../App/stores/store';

interface Props{
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  //const { activityStore } = useStore();
 // const { activitiesByDate } = activityStore;
  return (
    <Card attached='true' >
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
        <Card.Header style={{fontFamily:'Segoe UI',fontSize:'1rem'}}>{ activity.title}</Card.Header>
    </Card.Content>
    <Card.Content extra>
    <Link  to={`/activity/${activity.id}`}><Button style={{border:'1px solid',borderColor:'#007FFF',color:'#007FFF',backgroundColor:'white',fontSize:'1rem'}}>View</Button></Link>
    </Card.Content>
  </Card>
  );
}
export default observer(ActivityListItem);
