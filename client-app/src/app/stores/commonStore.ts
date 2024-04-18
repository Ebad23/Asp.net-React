import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string| null | undefined = localStorage.getItem('jwt');
    appLoaded= false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token, //what property we need to react to
            token => {   // this defined what we need to do with this property
            if (token)
            {
                localStorage.setItem('jwt',token);
            }
            else
            {
                localStorage.removeItem('jwt');
            }
        }
        )
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

        setServerError(error: ServerError) {
            this.error = error;
        }

        setAppLoaded = () => {
            this.appLoaded  = true;
        }
    }
