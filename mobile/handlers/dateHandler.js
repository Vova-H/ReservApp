const dateHandler = (date) => {
    const reversDate = date.split("/").reverse();
    const newRev = ([reversDate[0], reversDate[1], reversDate[2]] = [reversDate[0], reversDate[2], reversDate[1]])
    return (newRev).split(",").join("-")
}

export default dateHandler
