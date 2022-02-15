import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from 'react';
import {  Header } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;
  
  useEffect(() => {
    
  },[groupedActivities])
  
   
  return (
    <>
      {groupedActivities.map(([group, activities]) => {
       return <Fragment key={group}>
          <Header  style={{fontFamily:'Segoe UI',fontSize:'1rem'}}>{group}
        {activities.map(activity => {
       
       return <ActivityListItem key={activity.id} activity={activity}/>
     })}</Header>
        </Fragment>
      })}
     
      </>
  )
}
export default observer(ActivityList);
