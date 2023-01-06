import {Reservation, Role, Status, Time, User} from "../models/models.js";
import handlerDataTime from "../handlers/handlerDataTime.js";
import handlerCheckActivity from "../handlers/handlerCheckActivity.js";
import handlerShowTimes from "../handlers/handlerShowTimes.js";
import handlerConvertTime from "../handlers/handlerConvertTime.js";
import {raw} from "express";


export default class ReservationService {
    async index(id) {
        const reservations = await Reservation.findAll({
            include: [{model: User}, {model: Status, attributes: ["isValidStatus"]}],
            where: {userId: id},
            order: [
                ["date", "ASC"],
                ["time", "ASC"]
            ]
        })
        reservations.map(async el => {
            el.status.isValidStatus = handlerCheckActivity(el)
            let isValidStatusDB = await Status.findOne({where: {isValidStatus: el.status.isValidStatus}})
            el.statusId = await isValidStatusDB.id
            await el.save()
        })
        return reservations
    }

    async create(id, date, time, action) {
        const userDB = await User.findOne({where: {id: id}})
        const result = await handlerDataTime(date, time, id)
        if (result.length !== 0) {
            return {'errors': result}
        }
        time = handlerConvertTime(time)
        const reservation = await Reservation.create({
            date,
            time,
            action,
            userId: id,
            statusId: 1,
            client: [userDB.name, userDB.surname],
        })
        await reservation.save()
        return reservation
    }

    async checkFreeTime(date) {

        const {startOfDay} = await Time.findOne()
        const {endOfDay} = await Time.findOne()

        const allWorkingTime = handlerShowTimes(startOfDay, endOfDay)
        const allWorkingTimeConverted = []
        allWorkingTime.map(el => {
            allWorkingTimeConverted.push(handlerConvertTime(el))
        })
        const busyTimes = []
        const data = await Reservation.findAll({
            where: {
                date: date
            }
        })

        data.map((el) => {
            busyTimes.push(el.dataValues.time)
        })

        const checkedTime = []
        allWorkingTimeConverted.map((time, index) => {
            checkedTime.push({time: time, isFree: true})
            busyTimes.map((busyTime) => {
                if (time === busyTime) {
                    checkedTime[index].isFree = false
                }
            })
        })
        return checkedTime
    }


    async update(reqBody, id, idParam, role) {
        const err = []
        let reservation
        const roleDB = await Role.findOne({where: {id: role.id}})

        if (roleDB.nameOfRole.includes("ADMIN")) {
            reservation = await Reservation.findOne({
                where: {
                    id: idParam
                }
            })
        } else {
            reservation = await Reservation.findOne({
                where: {
                    id: idParam,
                    userId: id
                }
            })
        }

        const statusDB = await Status.findOne({where: {id: reservation.statusId}})

        if (!reservation) {
            err.push({"message": "Record not found"})
        }

        if (statusDB.isValidStatus === false) {
            err.push({"message": "You can't update date or time invalid reservation"})
        }

        if (err.length !== 0) {
            return {'errors': err}
        }

        const result = await handlerDataTime(reqBody.date, reqBody.time, id)

        if (result.length !== 0) {
            return {'errors': result}
        }
        if (roleDB.nameOfRole.includes("ADMIN")) {
            await Reservation.update({date: reqBody.date, time: reqBody.time, action: reqBody.action}, {
                where: {
                    id: idParam,
                }
            })
        } else {
            await Reservation.update({date: reqBody.date, time: reqBody.time, action: reqBody.action}, {
                where: {
                    id: idParam,
                    userId: id
                }
            })
        }
        return [{"message": "Your entry has been updated"}, reqBody]
    }

    async delete(id, idParam, role) {
        const roleDB = await Role.findOne({where: {id: role.id}})
        if (roleDB.nameOfRole.includes("ADMIN")) {
            await Reservation.destroy({where: {id: idParam}})
        } else {
            await Reservation.destroy({where: {id: idParam, userId: id}})
        }
        return {"message": "Your entry has been successfully deleted"}
    }
}

