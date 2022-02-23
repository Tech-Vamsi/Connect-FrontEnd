
import { useStore } from '../../../../App/stores/store';
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom'
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import { Grid } from 'semantic-ui-react';
import NotFound from '../../../Errors/NotFound';


const ActivityDetails = () => {

  const { activityStore } = useStore();
  const { selectedActivity: activity ,loadActivity,clearSelectedActivity} = activityStore;
  const { id } = useParams <{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id);
    return() => {
      clearSelectedActivity();
    }
  },[id,loadActivity,clearSelectedActivity])

  if (!activity) {
   return <NotFound/>
  }
  
  return (

    <Grid style={{width:'100vw',display:'flex',flexDirection:'row',justifyContent:'center'}}>
      <Grid.Column width={6} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat activityId={activity.id}/>
      </Grid.Column>
      <Grid.Column width={6} style={{display:'flex',flexDirection:'column',marginTop:'100px'}}>
      <ActivityDetailedSideBar activity={activity}/>
      </Grid.Column>
    </Grid>

  )
  
}

export default observer(ActivityDetails);