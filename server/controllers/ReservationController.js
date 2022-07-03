import jsonwebtoken from "jsonwebtoken";
import secret from "../config.js";
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

    async create(req) {
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const {date, time, action} = await req.body
        return this.reservationService.create(id, date, time, action)
    }

    async update(req) {
        const {date, time, action} = await req.body
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.update(date, time, action, id, idParam)
    }

    async delete(req) {
        const {id} = await jsonwebtoken.verify(handlerGetToken(req), secret)
        const idParam = req.params.id
        return this.reservationService.delete(id, idParam)
    }
}

const reservationController = new ReservationController(new ReservationService())

export default reservationController
