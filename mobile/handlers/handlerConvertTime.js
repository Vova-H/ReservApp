const handlerConvertTime = (time) => {
    const timeArr = time.split(":")
    let hours = timeArr[0]
    let minutes = timeArr[1]

    if (hours.length === 1) {
        hours = "0" + hours.toString()
    }
    if (minutes.length === 1) {
        minutes = "0" + minutes.toString()
    }
    return hours + ":" + minutes
}

export default handlerConvertTime
