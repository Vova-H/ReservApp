import {Reservation, User} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";

export default class ReservationService {
    async index(id) {
        return Reservation.findAll({where: {userId: id}})
    }

    async show(id, actionId) {
        return Reservation.findOne({where: {userId: id, id: actionId}})
    }

    async create(id, date, time, action) {
        const user = await User.findOne({where: {id: id}})
        const result = await handlerDataTime(date, time, id)
        if (result.length !== 0) {
            return {'errors': result}
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

    async update(date, time, action, id, idParam) {
        const reservation = await Reservation.findOne({
            where: {
                id: idParam,
                userId: id
            }
        })
        if (reservation === null) {
            return {"message": "Запись не найдена"}
        }
        const result = await handlerDataTime(date, time, id)

        if (result.length !== 0) {
            return {'errors': result}
        }
        Reservation.update({date: date, time: time, action: action}, {
            where: {
                id: idParam,
                userId: id
            }
        })
        return {"message": "Ваша запись обновленна"}
    }

    async delete(id, idParam) {
        const reservation = await Reservation.findOne({where: {id: idParam, userId: id}})
        if (reservation === null) {
            return {"message": "Запись не найдена"}
        }
        await Reservation.destroy({where: {id: idParam, userId: id}})
        return {"message": "Ваша запись успешно удалена"}
    }
}

