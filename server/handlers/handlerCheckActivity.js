const handlerCheckActivity = (el) => {
    const date = Date.parse(el.date)
    const timeArr = el.time.split(":")
    const time = timeArr[0] * 60 * 60 * 100 + timeArr[1] * 60 * 1000
    const dateTime = time + date
    if (dateTime < Date.now()) {
        return false
    }
};

export default handlerCheckActivity
