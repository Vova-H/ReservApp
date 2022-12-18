import {makeAutoObservable, runInAction} from "mobx";
import auth from "./authStore";
import {Alert} from "react-native";
import handlerConvertTime from "../handlers/handlerConvertTime";
import Config from "../config";

class ReservationStore {

    reservations = []
    editReservationItem = {}
    availableTimes = []

    constructor() {
        makeAutoObservable(this)
    }

    async getReservations() {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/reservation`, {
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

    async getAvailableTime(day) {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/reservation-checkTime`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(day)
        })
        const data = await response.json()
        runInAction(() => {
            this.availableTimes = data
        })

        return await data
    }


    async createReservation(reservation) {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/reservation`, {
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
                this.reservations.sort((a, b) => (a.date + a.time > b.date + b.time) ? 1 : -1)
            })
        } else {
            data.errors.map((error) => {
                Alert.alert("Error of creating", error.message)
            })
        }
        return data
    }

    async updateReservation(id, reservation) {
        const response = await fetch(`http://${Config.ip}:${Config.port}/api/reservation/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reservation)
        })
        const data = await response.json()
        if (data[1] && data[1].time)
            if (!data.errors) {
                runInAction(() => {
                    this.reservations.map((el) => {
                        if (el.id === id) {
                            el.action = data[1].action
                            el.date = data[1].date
                            el.time = handlerConvertTime(data[1].time)
                        }
                    })
                    this.reservations.sort((a, b) => (a.date + a.time > b.date + b.time) ? 1 : -1)
                })
            } else {
                Alert.alert("Error updating", data.errors)
            }

        return data
    }


    async deleteReservation(id) {
        await fetch(`http://${Config.ip}:${Config.port}/api/reservation/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        runInAction(() => {
            this.reservations = this.reservations.filter((item) => item.id !== id)
            this.reservations.sort((a, b) => (a.date + a.time > b.date + b.time) ? 1 : -1)
        })
    }
}

export default new ReservationStore()
