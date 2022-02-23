import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../API/Agent'
import { Activity, ActivityFormValues } from '../Models/Activity'
import { Profile } from "../Models/Profile";
import { store } from "./store";
// import { v4 as uuid } from 'uuid';
// import ObjecMapper from 'object-mapper';

export default class ActivityStore{
  //activities: Activity[] = [];
  activityRegistry = new Map < string,Activity> ();
  selectedActivity:Activity | undefined;
  editMode = false;
  sumitting = false;


  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   title:observable,
    //   setTitle:action
    // })
  }

  get activitiesByDate()
  {
    return Array.from(this.activityRegistry.values()).sort((a, b) => a.time!.getTime() - b.time!.getTime());
  }
  get groupedActivities()
  {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const time = format(activity.time!, 'dd MMM  yyyy');
        activities[time] = activities[time] ? [...activities[time], activity] : [activity];
        return activities;
      }, {} as {[key:string]:Activity[]})
    )
  }

loadActivities = async () => {
  try {
    const activities = await agent.Activites.list();
    runInAction(() => {
      activities.forEach(activity => {
        this.setActivity(activity);
      })
    })
  } catch(error) {
    // console.log(error);
  }
  }
  // setSelectedActivity =  (id:string) => {
  //  // this.selectedActivity= this.activities.find(act => act.id === id);
  //   this.selectedActivity = this.activityRegistry.get(id);
  // }
  // cancelSelectedActivity = () => {
  //   this.selectedActivity = undefined;
  // }
  // openForm = (id: string) => {
  //   console.log("OpenForm Method executed");
  //   id ? this.setSelectedActivity(id) : this.cancelSelectedActivity();
  //   this.editMode = true;
  // }
  openCreateForm = () => {
    console.log("OpenForm Method executed");
    
    this.editMode = true;
  }

  // closeForm = () => {
  //   this.editMode = false;
  // }

  createActivity = async (activity : ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee=new Profile(user!);
    try {
      await agent.Activites.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.userName;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
       // this.activities.push(activity);
        
      //  this.activityRegistry.set(activity.id,activity)
        this.selectedActivity = newActivity;
      })
      
      
    } catch (error)
    {
      console.log(error);
      
      //this.closeForm();
    }
  }

  updateActivity = async (activity:ActivityFormValues) => {
    try {
      await agent.Activites.update(activity);
    
      runInAction(() => {
       // this.activities = [...this.activities.filter(act => act.id !== activity.id), activity];
       // ObjecMapper.merge(activity, this.activities.filter(act => act.id === activity.id))
        if (activity.id)
        {
          let updatedActivity = { ...this.getActivity(activity.id), ...activity }
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
          }
      
      //  this.activities = [...this.activities];
        
        
      })
    } catch (error)
    {
      console.log(error);
    }
  }

  deleteActivity = async (id: string) => {
    try {
      await agent.Activites.delete(id);
      runInAction(() => {
       // this.activities = [...this.activities.filter(act => act.id !== id)];
        this.activityRegistry.delete(id);
      })
    } catch (error) {
      console.log(error);
    }
  }
  loadActivity = async (id:string) => {
    let activity = this.getActivity(id);
    if (activity)
    {
      this.selectedActivity = activity;
      return activity;
    } else {
      try {
        activity = await agent.Activites.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        })
        return activity;
      } catch (error) {
        console.log(error);
      }
      }
}

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(a => a.username === user.userName);
      activity.isHost = activity.hostUsername === user.userName;
      activity.host = activity.attendees.find(x => x.username=== activity.hostUsername);
    }
    
    activity.time = new Date(activity.time!); //activity.time.split('T')[0];
    //   this.activities.push(activity);
       this.activityRegistry.set(activity.id, activity);
  }
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  updateAttendence = async () => {
    const user = store.userStore.user;
    try {
      await agent.Activites.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(x => x.username !== user?.userName);
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      })
    } catch (error) {
      
    } finally {
      
    }
  }

  cancelActivityToggle = async ()=>{
    try {

      await agent.Activites.attend(this.selectedActivity!.id)
      runInAction(() => {
        this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      })
    } catch (error) {
      console.log(error);
    }
  }
  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

}