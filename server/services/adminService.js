import {Gender, Reservation, Status, Time, User} from "../models/models.js";
import handlerCheckActivity from "../handlers/handlerCheckActivity.js";
import handlerValidTime from "../handlers/handlerValidTime.js";

export default class AdminService {
    async getAllUsers() {
        return await User.findAll({
            include: {model: Gender, attributes: ["nameOfGender"]},
            order: [
                ["createdAt", "ASC"],
            ]
        })
    }

    async getAllReservations() {
        const reservations = await Reservation.findAll({
            include: [
                {model: User},
                {
                    model: Status, attributes: ["isValidStatus"]
                }],
            order: [
                ["date", "ASC"],
                ["time", "ASC"]
            ]
        })
        reservations.map(el => {
            el.isValidStatus = handlerCheckActivity(el)
            el.save()
        })

        return reservations
    }


    async getWorkingTime() {
        return await Time.findOne({
            where: {
                id: 1
            }
        })
    }


    async changeWorkingTime(startOfDay, endOfDay) {

        const err = []
        const isValidStartOfDay = handlerValidTime(startOfDay)
        const isValidEndOfDay = handlerValidTime(endOfDay)
        if (isValidStartOfDay || isValidEndOfDay) {
            err.push({"message": "Not valid time"})
        }
        if (err.length !== 0) {
            return {'errors': err}
        }

        await Time.update({startOfDay: startOfDay, endOfDay: endOfDay}, {
            where: {
                id: 1
            }
        })
        return [{"message": "Working time has been updated"},
            {startOfDay, endOfDay}
        ]
    }
}

