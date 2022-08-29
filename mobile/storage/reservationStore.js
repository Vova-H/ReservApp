import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import auth from "./authStore";

class ReservationStore {

    reservations = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    async getReservations() {
        const reservationsData = await axios.get('http://10.0.2.2:5000/api/reservation', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        runInAction(() => {
            this.reservations = reservationsData.data
        })
    }

    async createReservation(reservation) {
        const newReservation = axios.post('http://10.0.2.2:5000/api/reservation', reservation, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        runInAction(() => {
            this.reservations = [...this.reservations, newReservation]
        })
        return newReservation
    }
}

export default new ReservationStore()
