import {Reservation} from "../models/models.js";

const handlerDataTime = async (date, time) => {
    const err = []
    try {
        const reqTime = time.split(':')
        if (reqTime[0] > 23 ||
            reqTime[0] < 0 ||
            reqTime[1] < 0 ||
            reqTime[1] > 59
        ) {
            err.push({"message": "wrong time"})
            return err
        }

        if (reqTime[0] > 17 || reqTime[0] < 9
        ) {
            err.push({"message": "make an appointment during business hours"})
        }

        const onlyTime = ((reqTime[0] * 3600 * 1000) + (reqTime[1] * 60 * 1000) - 10800000)
        const onlyDate = Date.parse(date)

        if (onlyDate + onlyTime <= Date.now()) {
            err.push({"message": "you can't record past tense"})
        }
        const dateTimeChecking = await Reservation.findOne({where: {date: date, time:time}})
        if (dateTimeChecking) {
            err.push({"message": "There is already a record for the current time"})
        }

        let dayOfWeek = new Date(date).getDay();

        if (dayOfWeek === 6) {
            err.push({"message": `we don't work on saturdays`})
        } else if (dayOfWeek === 0) {
            err.push({"message": `we don't work on sundays`})
        }

        return err

    } catch (e) {
        console.log(e)
        err.push({"message": `invalid date entered`})
        return err
    }

}

export default handlerDataTime
