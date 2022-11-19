import {makeAutoObservable, runInAction} from "mobx";
import auth from "./authStore";

class ReservationStore {

    reservations = []
    editReservationItem = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getReservations() {
        const response = await fetch('http://10.0.2.2:5000/api/reservation', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const data = await response.json()
        runInAction(() => {
            this.reservations = [...this.reservations, ...data]
        })
        return data
    }

    async createReservation(reservation) {
        const response = await fetch('http://10.0.2.2:5000/api/reservation', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reservation)
        })
        const data = await response.json()
        if (!data.errors) {
            runInAction(() => {
                this.reservations = [...this.reservations, data]
            })
        } else {
            data.errors.map((error) => {
                alert(error.message)
            })
        }
        return data
    }

    async updateReservation(id, reservation) {
        const response = await fetch(`http://10.0.2.2:5000/api/reservation/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reservation)
        })

        const data = await response.json()
        runInAction(() => {
            this.reservations.map((el) => {
                if (el.id === id) {
                    el.action = data[1].action
                    el.date = data[1].date
                    el.time = data[1].time
                }
            })
        })
        return data
    }


    async deleteReservation(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        };
        await fetch(`http://10.0.2.2:5000/api/reservation/${id}`, requestOptions)
        runInAction(() => {
            this.reservations = this.reservations.filter((item) => item.id !== id)
        })
    }
}

export default new ReservationStore()
