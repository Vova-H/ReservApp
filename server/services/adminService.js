import {Reservation, User} from "../models/models.js";
import handlerCheckActivity from "../handlers/handlerCheckActivity.js";

export default class AdminService {
    async getAllUsers() {
        return await User.findAll()
    }

    async getAllReservations() {
        const reservations = await Reservation.findAll()
        reservations.map(el => {
            el.isValidStatus = handlerCheckActivity(el)
            el.save()
        })
        return reservations
    }
}

