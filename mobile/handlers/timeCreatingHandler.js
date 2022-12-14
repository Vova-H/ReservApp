const creatingTime = () => {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()

    if (minutes > 0 && minutes <= 7) {
        minutes = 0
    } else if (minutes <= 20) {
        minutes = 15
    } else if (minutes > 20 && minutes <= 35) {
        minutes = 30
    } else if (minutes > 35 && minutes < 50) {
        minutes = 45
    } else if (minutes >= 50) {
        minutes = 0
        hours++
    }
    minutes = minutes.toString()
    if (minutes.length === 1) {
        minutes = "0" + minutes.toString()
    }
    if (hours.length === 1) {
        hours = "0" + hours.toString()
    }
    return hours + ":" + minutes
}


export default creatingTime()
