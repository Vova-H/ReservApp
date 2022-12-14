import {makeAutoObservable, runInAction} from "mobx";


class AuthStore {
    token = ""
    client = {}
    isAdmin = false

    constructor() {
        makeAutoObservable(this)
    }

    registration = async (user) => {
        const response = await fetch('http://10.0.2.2:5000/api/registration', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    }

    login = async (user) => {
        const response = await fetch('http://10.0.2.2:5000/api/login', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (data.message) {
            alert(data.message)
        } else {
            const token = data[0]
            runInAction(() => {
                this.token = token
                this.client = data[1]
                this.isAdmin = data[1].roles.includes("ADMIN")
            })
        }
        return await data
    }

    logout() {
        this.token = ""
        this.client = {}
        return null
    }
}

export default new AuthStore()
