import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { Activity, ActivityFormValues } from '../../App/Models/Activity'
import { store } from '../stores/store';
import { User, UserFormValues } from '../Models/user';
import { Photo, Profile } from '../Models/Profile';
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}
axios.defaults.baseURL = "https://localhost:5000/api"

export const controller = new AbortController();

axios.interceptors.request.use( async (config) =>{

  const token = store.commonStore.token;
  if (token) {
    config.headers = {
      'Authorization': `Bearer ${token}`
    }
    }else {
    config.headers = {}
  }
  
    return config;
  
})





axios.interceptors.response.use(async response => {

  
    await sleep(1000);
    return response;

  // } catch (error) {
  //   console.log(error);
  //   return await Promise.reject(error);
  // }
}, (error: AxiosError) => {
  const { data, status,config } = error.response!;
  switch (status) {
    case 400:
      if (typeof data === 'string')
      {
        toast.error(data);
        }
      if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
       
     }

      // if (data.errors) {
      //   const modalStateErrors = [];
      //   for (const key in data.errors) {
      //     if (data.errors[key]) {
      //       modalStateErrors.push(data.errors[key]);
      //     }
      //   }
      //   throw modalStateErrors.flat();
      // } else {
      toast.error("Bad Request");
  //}
      break;
    case 401:
      toast.error("unauthorised Request");
      break;
    case 404:
      toast.error("Not Found");
     
      break;
    case 500:
      store.commonStore.setServerError(data);
        toast.error("Server Error");
  }
  return Promise.reject(error);
})


const responseBody =<T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
  put:<T> (url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
 
  
}

const Activites = {
  list: () => requests.get<Activity[]>('/Activities'),
  details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>(`/Activities`, activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
  attend:(id: string) => requests.post<void>(`/Activities/${id}/attend`,{}),
}
const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register:(user:UserFormValues)=>requests.post<User>('/account/register',user)
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profile/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('photos', formData, {
      headers:{'Content-type':'multipart/form-data'}
    })
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto:(id:string)=>requests.delete(`/photos/${id}`)
}


const agent = {
  Activites,
  Account,
  Profiles
}

export default agent;