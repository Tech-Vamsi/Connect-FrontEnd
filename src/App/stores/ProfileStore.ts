import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/Agent";
import { Photo, Profile } from "../Models/Profile";
import { store } from "./store";

export default class ProfileStore{
  profile: Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if(store.userStore.user && this.profile)
    {
      return store.userStore.user.userName === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string)=>{
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
      })
    } catch (error)
    {
      console.log(error);
    }
  }
  uploadPhoto = async (file: Blob) => {
    try {
      const response=await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user)
          {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
            }
        }
      })
    } catch (error)
    {
      console.log(error);
    }
  }
  setMainPhoto = async (photo:Photo) => {
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos)
        {
          this.profile.photos.find(p => p.isMain)!.isMain = false;
          this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          store.activityStore.loadActivities();
          }
      })
    } catch (error)
    {
      console.log(error);
    }
  }
  
  deletePhoto = async (photo:Photo) => {
    try {
      await agent.Profiles.deletePhoto(photo.id);
      if (this.profile)
      {
        this.profile.photos=this.profile.photos?.filter(p => p.id !== photo.id);
       
        }
    } catch (error)
    {
      console.log(error);
    }
  }
}