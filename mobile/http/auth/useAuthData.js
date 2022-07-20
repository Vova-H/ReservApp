import React from 'react';
import axios from "axios";
import {useMutation} from "react-query";


const createRegistration = (user) => {
    return axios.post('http://10.0.2.2:5000/api/registration', user)
}

const login = (user) => {
    return axios.post('http://10.0.2.2:5000/api/login', user)
        .then(response => {
            console.log(response.data)
            localStorage.setItem("token", response.data)
        })
}

// const logout = () => {
//     return axios.get('http://10.0.2.2:5000/api/logout')
// }

export const useCreateRegistrationData = () => {
    return useMutation(createRegistration)
}
export const useLogin = () => {
    return useMutation(login)
}


