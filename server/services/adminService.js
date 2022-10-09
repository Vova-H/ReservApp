import {Reservation, User} from "../models/models.js";

export default class AdminService {
    async getAllUsers() {
        return await User.findAll()
        // users.map(async (user) => {
        //     const {password, ...rest} = user;
        //     await console.log(rest)
        // })

    }

    async getAllReservations() {
        return Reservation.findAll()
    }
}

