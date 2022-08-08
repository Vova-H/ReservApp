const dateHandler = (date) => {
    const convertDate = date.toLocaleDateString()
    const reversDate = convertDate.split("/").reverse();
    const newRev = ([reversDate[0], reversDate[1], reversDate[2]] = [reversDate[0], reversDate[2], reversDate[1]])
    return ("20" + newRev).split(",").join("-")
}

export default dateHandler
