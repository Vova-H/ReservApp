import {makeAutoObservable, runInAction} from "mobx";
import {Alert} from "react-native";
import Config from "../config";

class AuthStore {
    token = ""
    client = {}
    isAdmin = false

    constructor() {
        makeAutoObservable(this)
    }

    registration = async (user) => {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/registration`, {
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
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/login`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (data.message) {
            Alert.alert("Login Error", data.message)
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
