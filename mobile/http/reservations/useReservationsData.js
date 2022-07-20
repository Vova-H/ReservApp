import React from 'react';
import axios from "axios";
import {useMutation, useQuery} from "react-query";


const Reservations = () => {
    return axios.get('http://10.0.2.2:5000/api/reservation', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const createReservation = () => {
    return axios.post('http://10.0.2.2:5000/api/reservation')
}

export const useReservations = () => {
    return  useQuery('reservations', Reservations)
}

export const useCreateReservationData = () => {
    return useMutation(createReservation)
}


