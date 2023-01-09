import jsonwebtoken from "jsonwebtoken";
import secret from "../sign.js";
import ReservationService from "../services/reservationService.js";
import handlerGetToken from "../handlers/handlerGetToken.js";
import {validationResult} from "express-validator";

class ReservationController {
    reservationService;

    constructor(reservationService) {
        this.reservationService = reservationService
    }

    async index(req) {
        const {id} = jsonwebtoken.verify(handlerGetToken(req), secret)
        return this.reservationService.index(id)
    }

    async create(req) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return errors
        }
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const {date, time, action} = await req.body
        return this.reservationService.create(id, date, time, action)
    }

    async checkFreeTime(req) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return errors
        }
        const {date} = req.body
        return this.reservationService.checkFreeTime(date)
    }

    async update(req) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return errors
        }
        const reqBody = await req.body
        const {id, role} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.update(reqBody, id, idParam, role)
    }

    async delete(req) {
        const {id, role} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.delete(id, idParam, role)
    }
}

const reservationController = new ReservationController(new ReservationService())

export default reservationController
