const handlerValidTime = (reqTime) => {
    const time = reqTime.split(':')
    if (time[0] > 23 ||
        time[0] < 0 ||
        time[1] < 0 ||
        time[1] > 59
    ) {
        return false
    }
}

export default handlerValidTime
