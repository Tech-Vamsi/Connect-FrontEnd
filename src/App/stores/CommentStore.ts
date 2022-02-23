import { ChatComment } from "../Models/Comment";
import * as signalr from "@microsoft/signalr"
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
export default class CommentStore{
  comments: ChatComment[] = [];
  hubConnection: signalr.HubConnection | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity)
    {
      this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl('https://localhost:5000/chat?activityId=' + activityId, {
          accessTokenFactory: () => store.userStore.user?.token!
        })
        .withAutomaticReconnect()
        .configureLogging(signalr.LogLevel.Information)
        .build();
      
      this.hubConnection.start().catch(error => console.log("Error establishing the connection ", error))
      this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
        runInAction(() => {
          // comments.forEach(comment => {
          //  // comment.createAt = new Date(comment.createAt+'Z');
          // })
          this.comments = comments;
        })
        this.hubConnection?.on('ReceivedComment', (comment: ChatComment) => {
          runInAction(() => {
            //comment.createAt = new Date(comment.createAt);
            this.comments.unshift(comment);
          })
        })
      });
      }
  }
  stopHubConnection = () => {
    this.hubConnection?.stop().catch(error => console.log("Error stopping connection: ", error));
  }

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  }

  addComment = async (values: any) => {
    console.log("Adding Comment")
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
      await this.hubConnection?.invoke('SendComment', values);
    } catch (error)
    {
      console.log(error)
    }
  }
}