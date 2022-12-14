import jsonwebtoken from "jsonwebtoken";
import secret from "../sign.js";
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

    async create(req) {
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const {date, time, action} = await req.body
        return this.reservationService.create(id, date, time, action)
    }

    async checkFreeTime(req) {
        const {date} = req.body
        return this.reservationService.checkFreeTime(date)
    }

    async update(req) {
        const reqBody = await req.body
        const {id, roles} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.update(reqBody, id, idParam, roles)
    }

    async delete(req) {
        const {id, roles} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.delete(id, idParam, roles)
    }
}

const reservationController = new ReservationController(new ReservationService())

export default reservationController
