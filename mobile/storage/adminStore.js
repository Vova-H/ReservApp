import {makeAutoObservable, runInAction} from "mobx";
import auth from "./authStore";
import Config from "../config";


class AdminStore {

    allReservations = []
    allUsers = []
    startOfDay = ""
    endOfDay = ""

    constructor() {
        makeAutoObservable(this)
    }

    async getAllUsers() {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/admin-users`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        await runInAction(() => {
            this.allUsers = [...this.allUsers, ...data]
        })
        return await data
    }


    async getAllReservations() {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/admin-reservations`, {
            headers: {
                method: "GET",
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        runInAction(() => {
            this.allReservations = [...this.allReservations, ...data]
        })
        return await data
    }

    async getWorkingTime() {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/admin-time`, {
            headers: {
                method: "GET",
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        const {startOfDay, endOfDay} = await data
        await runInAction(() => {
            this.startOfDay = startOfDay
            this.endOfDay = endOfDay
        })
        return await data
    }

    async updateWorkingTime(newTime) {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/admin-time`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTime)
        })

        return await response.json()
    }


}

export default new AdminStore()
