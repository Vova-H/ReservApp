import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";


class AuthStore {
    token = ""
    client = {}

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    registration = async (user) => {
        return axios.post('http://10.0.2.2:5000/api/registration', user)
    }

    login = async (user) => {
        const {data} = await axios.post('http://10.0.2.2:5000/api/login', user)
        const token = data[0]
        runInAction(() => {
            this.token = token
            this.client = data[1]
        })
        return data
    }

    logout() {
        this.token = ""
        this.client = {}
        return null
    }
}

export default new AuthStore()
