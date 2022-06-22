import {Reservation} from "../models/models.js";

const handlerDataTime = async (date, time, userId) => {
    const err = []
    try {
        const reqTime = time.split(':')
        if (reqTime[0] > 23 ||
            reqTime[0] < 0 ||
            reqTime[1] < 0 ||
            reqTime[1] > 59
        ) {
            err.push({"message": "некорректное время"})
            return err
        }

        if (reqTime[0] > 17 || reqTime[0] < 9
        ) {
            err.push({"message": "сделайте запись  в рабочее время"})
        }

        const onlyTime = ((reqTime[0] * 3600 * 1000) + (reqTime[1] * 60 * 1000) - 10800000)
        const onlyDate = Date.parse(date)

        if (onlyDate + onlyTime <= Date.now()) {
            err.push({"message": "вы не можете сделать запись на прошлое время"})
        }



        const checkDate = await Reservation.findOne({where: {userId: userId, date: date}})
        const checkTime = await Reservation.findOne({where: {userId: userId, time: time}})

        if (checkDate && checkTime) {
            err.push({"message": "На текущее время уже есть запись"})
        }

        let dayOfWeek = new Date(date).getDay();

        if (dayOfWeek === 6) {
            err.push({"message": `мы не работаем по субботам`})
        } else if (dayOfWeek === 0) {
            err.push({"message": `мы не работаем по воскресеньям`})
        }

        return err

    } catch (e) {
        console.log(e)
        err.push({"message": `введена некоректная дата`})
        return err
    }

}

export default handlerDataTime
