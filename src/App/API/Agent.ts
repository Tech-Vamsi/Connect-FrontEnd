import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { Activity } from '../../App/Models/Activity'
import { store } from '../stores/store';
import { history } from '../..';
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}
axios.defaults.baseURL = "https://localhost:5000/api"
export const controller = new AbortController();
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
        history.push('/notfound');
     }
      history.push('/notfound');
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
      history.push('/server-error');
        toast.error("Server Error");
  }
  return Promise.reject(error);
})


const responseBody =<T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url,body,{signal: controller.signal}).then(responseBody),
  put:<T> (url: string, body: {}) => axios.put<T>(url,body,{signal: controller.signal}).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
 
  
}

const Activites = {
  list: () => requests.get<Activity[]>('/Activities'),
  details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/Activities`, activity),
  update: (activity: Activity) => requests.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
}

const agent = {
  Activites
}

export default agent;