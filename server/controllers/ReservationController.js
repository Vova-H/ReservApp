import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
import {Reservation, User} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";
import ReservationService from "../services/reservationService.js";
import handlerGetToken from "../handlers/handlerGetToken.js";

class ReservationController {
    reservationService;

    constructor(reservationService) {
        this.reservationService = reservationService
    }

    async index(req) {
        const {id} = jsonwebtoken.verify(handlerGetToken(req), secret)
        return this.reservationService.index(id)
    }

    async show(req) {
        const {id} = jsonwebtoken.verify(handlerGetToken(req), secret)
        const actionId = req.params.id
        return this.reservationService.show(id, actionId)
    }

    async create(req, res) {
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const user = await User.findOne({where: {id: id}})
        const {date, time, action} = await req.body
        const result = await handlerDataTime(date, time, id)
        if (result.length !== 0) {
            return res.status(400).json({'errors': result})
        }
        return this.reservationService.create(id, user, date, time, action)
    }

    async update(req, res) {
        try {
            const {date, time, action} = await req.body
            const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
            const idParam = req.params.id
            const reservation = await Reservation.findOne({
                where: {
                    id: idParam,
                    userId: id
                }
            })
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
            const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
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

const reservationController = new ReservationController(new ReservationService())

export default reservationController
