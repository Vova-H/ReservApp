const handlerCheckActivity = (el) => {
    const date = Date.parse(el.date)
    const timeArr = el.time.split(":")
    const time = timeArr[0] * 60 * 60 * 1000 + timeArr[1] * 60 * 1000
    const dateTime = time + date
    return Date.now() + 7200000 < dateTime;
};

export default handlerCheckActivity
