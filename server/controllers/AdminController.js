import {Reservation, User} from "../models/models.js";


class AdminController {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json({"message": "getting error"})
        }
    }

    async getAllReservations(req, res) {
        try {
            const actions = await Reservation.findAll()
            return res.status(200).json(actions)
        } catch (e) {
            return res.status(400).json({"message": "getting error"})
        }
    }
}

export default new AdminController()
