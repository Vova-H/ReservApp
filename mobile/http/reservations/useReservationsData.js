import React from 'react';
import axios from "axios";


export const Reservations = async ({navigation}) => {
    try {
        const reservationsData = await axios.get('http://10.0.2.2:5000/api/reservation', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return reservationsData.data
    } catch (e) {
        console.log(e.response.status)
        switch (e.response.status) {
            case 404 :
                navigation.navigate('Login')
                alert('Page not found')
                break;
            case 403:
                navigation.navigate('Login')
                alert('Access forbidden')
                break;
        }
        navigation.navigate('Login')
    }
}

// export const useReservations = () => useQuery('reservations', Reservations)




