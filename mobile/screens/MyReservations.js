import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {useReservations} from "../http/reservations/useReservationsData";

const MyReservations = () => {

    const [reservations, setReservations] = useState([])

    const {status, data} = useReservations()

    console.log(status)

    useEffect(() => {
        if (status==="success") {
            setReservations(data.data)
        }
    }, [data])

    return (
        <View>
            {reservations.map((el) => <Text key={el.id}>{el.action}</Text>)}
        </View>
    );
};

export default MyReservations;
