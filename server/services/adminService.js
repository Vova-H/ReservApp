import {Reservation, User} from "../models/models.js";

export default class AdminService {
    async getAllUsers() {
        return User.findAll()
    }

    async getAllReservations() {
        return Reservation.findAll()
    }
}

