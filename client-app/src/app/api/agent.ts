import axios, { AxiosError, AxiosResponse } from 'axios'
import { Activity, ActivityFormValues } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Route';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Profile } from '../models/Profile';
import { Photo } from '../models/Photo';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
//define the base url
axios.defaults.baseURL = 'http://localhost:5000/api';


axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch(status)
    {
        case 400:
            if (config.method == 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                   
                }
                throw modelStateErrors.flat();
            }
            else
            {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
            case 403:
                toast.error('forbidden')
                break;
                case 404:
                    //toast.error('not found')
                    router.navigate('/not-found');
                    break;
                case 500:
                    store.commonStore.setServerError(data);
                    router.navigate('/server-error');
                    break;
    }
    return Promise.reject(error);
})

//define the response body
const responseBody = <T> (response:AxiosResponse <T>) => response.data;


//define the header in request
axios.interceptors.request.use(config => {
    const token  = store.commonStore.token;
    if (token)
    {
        console.log("inside agent" +token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//define all the requests we will use
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}



//set complete get request url
const Activities = {
    list:() => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>(`/activities`, activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend : (id : string) => requests.post<void>(`/activities/${id}/attend`,{})
}

const Account = {
    current:() => requests.get<User>('/account'),
    login:(user: UserFormValues) => requests.post<User>('/account/Login',user),
    register: (user:UserFormValues) => requests.post<User>('/account/Register',user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos',formData , {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    setMainPhoto: (id: string) => requests.post<void>(`/photos/${id}/setMain`,{}),
    deletePhoto: (id: string) => requests.del<void>(`/photos/${id}`),
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;

