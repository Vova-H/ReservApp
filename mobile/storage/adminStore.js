import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import auth from "./authStore";

class AdminStore {

    allReservations = []
    allUsers = []

    constructor() {
        makeAutoObservable(this)
    }

    async getAllUsers() {
        const allUsersData = await axios.get('http://10.0.2.2:5000/api/admin-users', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.allUsers = allUsersData.data
        })
        console.log(this.allUsers)
        return allUsersData
    }

    async getAllReservations() {
        const allReservationsData = await axios.get('http://10.0.2.2:5000/api/admin-reservations', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.allReservations = allReservationsData.data
        })
        console.log(this.allReservations)
        return allReservationsData
    }


}

export default new AdminStore()
