import { observer } from "mobx-react-lite";
import { Container, Stack } from "react-bootstrap"
import ActivityList from "./ActivityList";
import { useStore } from "../../../App/stores/store";
import { useEffect } from "react";
import React from 'react';
import { Dimmer, Loader, Segment } from "semantic-ui-react";

interface Props{
  submitting: boolean;
}

const ActivityDashboard = (props: Props) => {
  const { activityStore } = useStore();
  //const [submitting, setSubmitting] = useState(false);
  const { activityRegistry,loadActivities } = activityStore;

  useEffect(() => {

    if (activityRegistry.size === 0) loadActivities();
    //activityStore.loadActivities();

  },[activityRegistry.size,loadActivities])
 
  if (activityRegistry.size=== 0)
  {
    return (

      <Segment style={ {border:'none',width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
    )}
  
  return (
    <div className="d-flex justify-content-center  overflow-y: scroll">
      <Container fluid="xxl"  >
     
      <ActivityList></ActivityList>
      
      </Container>
      <div className="d-flex flex-column m-5 w-100 ">
      <Stack gap={5} >
      
          {/* {
            activityStore.editMode && 
            <ActivityForm
                submitting={props.submitting}></ActivityForm>
          } */}
          
      </Stack>
      </div>
  </div>
   

  )
}
export default observer(ActivityDashboard);