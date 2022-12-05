const handlerShowTimes = (startOfDay, endOfDay) => {

    const allTime = []
    const startOfDayArray = startOfDay.split(":")
    const sODH = parseInt(startOfDayArray[0])
    const sODM = parseInt(startOfDayArray[1])
    const endOfDayArray = endOfDay.split(":")
    const eODH = parseInt(endOfDayArray[0])
    const eODM = parseInt(endOfDayArray[1])

    let hv = true
    for (let i = sODH; i <= eODH; i++) {
        if (hv) {
            for (let j = sODM; j < 60; j += 15) {
                let tmp = j
                if (tmp === 0) {
                    allTime.push(`${i}:${tmp + "0"}`)
                } else {
                    allTime.push(`${i}:${tmp}`)
                }
            }
        } else {
            for (let j = 0; j < 60; j += 15) {
                let tmp = j
                if ((i + (j / 100)) < (eODH + (eODM / 100))) {
                    if (tmp === 0) {
                        allTime.push(`${i}:${tmp + "0"}`)
                    } else {
                        allTime.push(`${i}:${tmp}`)
                    }
                }
            }
        }
        hv = false
    }

    return allTime
}


export default handlerShowTimes
