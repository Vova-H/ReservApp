import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
import {Reservation, User} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";

class ReservationController {

    async index(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = jsonwebtoken.verify(token, secret)
            const reservations = await Reservation.findAll({where: {userId: id}})
            return res.status(200).json(reservations)
        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "something wrong"})
        }
    }

    async create(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = await jsonwebtoken.verify(token, secret)
            const user = await User.findOne({where: {id: id}})
            const {date, time, action} = await req.body

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
            return res.json({"message": "Резервация успешна"})

        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "reservation failed"})
        }
    }

    async update(req, res) {
        try {
            const {date, time, action} = await req.body
            const token = req.headers.authorization.split(" ")[1]
            const {id} = await jsonwebtoken.verify(token, secret)
            const idParam = req.params.id
            const reservation = await Reservation.findOne({
                where: {
                    id: idParam,
                    userId: id
                }
            })
            console.log(reservation)
            if (reservation === null) {
                return res.json({"message": "Запись не найдена"})
            }
            const result = await handlerDataTime(date, time, id)

            if (result.length !== 0) {
                return res.status(400).json({'errors': result})
            }
            Reservation.update({date: date, time: time, action: action}, {
                where: {
                    id: idParam,
                    userId: id
                }
            })
            return res.json({"message": "Ваша запись обновленна"})

        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "update failed"})
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const {id} = await jsonwebtoken.verify(token, secret)
            const idParam = req.params.id
            const reservation = await Reservation.findOne({where: {id: idParam, userId: id}})
            if (reservation === null) {
                return res.json({"message": "Запись не найдена"})
            }
            await Reservation.destroy({where: {id: idParam, userId: id}})
            return res.json({"message": "Ваша запись успешно удалена"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({"message": "delete failed"})
        }
    }
}

export default new ReservationController()
