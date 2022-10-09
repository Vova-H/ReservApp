import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import auth from "./authStore";

class ReservationStore {

    reservations = []
    editReservationItem = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getReservations() {
        const reservationsData = await axios.get('http://10.0.2.2:5000/api/reservation', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.reservations = reservationsData.data
        })
        return reservationsData
    }

    async createReservation(reservation) {
        const newReservation = await axios.post('http://10.0.2.2:5000/api/reservation', reservation, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.reservations = [...this.reservations, newReservation]
        })
        return newReservation
    }

    async updateReservation(id, reservation) {
        const updatedReservation = await axios.put(`http://10.0.2.2:5000/api/reservation/${id}`, reservation, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.reservations = [...this.reservations, updatedReservation]
        })
        return updatedReservation
    }

    async deleteReservation(id) {
        const deletedReservation = await axios.delete(`http://10.0.2.2:5000/api/reservation/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        await runInAction(() => {
            this.reservations = this.reservations.filter((item) => item.id !== id)
        })
        return deletedReservation
    }
}

export default new ReservationStore()
