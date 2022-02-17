import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../API/Agent'
import { Activity } from '../Models/Activity'
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

  createActivity = async (activity : Activity) => {
   
    try {
      await agent.Activites.create(activity);
      
      runInAction(() => {
       // this.activities.push(activity);
        
       this.activityRegistry.set(activity.id,activity)
        this.selectedActivity = activity;
      })
      
      
    } catch (error)
    {
      console.log(error);
      
      //this.closeForm();
    }
  }

  updateActivity = async (activity:Activity) => {
    try {
      await agent.Activites.update(activity);
    
      runInAction(() => {
       // this.activities = [...this.activities.filter(act => act.id !== activity.id), activity];
       // ObjecMapper.merge(activity, this.activities.filter(act => act.id === activity.id))
       this.activityRegistry.set(activity.id,activity)
      //  this.activities = [...this.activities];
        
        this.selectedActivity = activity;
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
    activity.time = new Date(activity.time!); //activity.time.split('T')[0];
    //   this.activities.push(activity);
       this.activityRegistry.set(activity.id, activity);
  }
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }
}