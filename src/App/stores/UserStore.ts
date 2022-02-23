import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/Agent";
import { User,UserFormValues } from "../Models/user";
import { store } from "./store";

export default class UserStore{
  user: User | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    if (this.user === null)
    {
      return false;
      }
    return true;
  }
  login = async (cred: UserFormValues) => {
    
    try {
      const user = await agent.Account.login(cred);
      store.commonStore.setToken(user.token);
      runInAction(() => {
       
        this.user = user;
      });
      
    } catch (error)
    {
      throw error;
    }
    
  }
  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.user = null;
    
  }

  getUser = async () => {
  try {
    const user = await agent.Account.current();
    runInAction(() => {
      this.user = user;
      
    })
  } catch (error) {
    console.log(error);
  }
  }

  register = async (creds: UserFormValues) => {
   
    const user = await agent.Account.register(creds).catch((error) => {
      throw error;
    }).then((user) => {
      store.commonStore.setToken(user.token);
      runInAction(() => {
      
        this.user = user;
      });
    });
    }
    
  setImage = (Image: string) => {
    if (this.user)
    {
      this.user.image = Image;
      }
  }
  }
    
