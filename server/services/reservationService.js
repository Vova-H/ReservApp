import {Reservation} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";

export default class ReservationService {
    async index(id) {
        return Reservation.findAll({where: {userId: id}})
    }

    async show(id, actionId) {
        return Reservation.findOne({where: {userId: id, id: actionId}})
    }

    async create(id, user, date, time, action) {

        const result = await handlerDataTime(date, time, id)
        if (result.length !== 0) {
            return res.status(400).json({'errors': result})
        }
        const reservation = await Reservation.create({
            date,
            time,
            action,
            userId: id,
            client: [user.name, user.surname]
        })
        await reservation.save()
        return reservation
    }


}

