import {makeAutoObservable, runInAction} from "mobx";
import auth from "./authStore";

class AdminStore {

    allReservations = []
    allUsers = []

    constructor() {
        makeAutoObservable(this)
    }

    async getAllUsers() {
        const response = await fetch('http://10.0.2.2:5000/api/admin-users', {
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
        const response = await fetch('http://10.0.2.2:5000/api/admin-reservations', {
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
}

export default new AdminStore()
