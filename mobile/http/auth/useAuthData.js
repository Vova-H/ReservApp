import React from 'react';
import axios from "axios";
import {useMutation} from "react-query";


const registration = (user) => {
    return axios.post('http://10.0.2.2:5000/api/registration', user)
}

const login = async (user) => {
    const loginData = await axios.post('http://10.0.2.2:5000/api/login', user)
    return await loginData.data
}


export const useRegistration = () => {
    return useMutation(registration)
}
export const useLogin = () => {
    return useMutation(login)
}


