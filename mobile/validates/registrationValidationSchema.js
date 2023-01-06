import * as yup from 'yup'
require("yup-phone")

const registrationValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    gender:yup.string().required('Chose you gender'),
    phone: yup.string().phone().required('Enter you phone number'),
    email: yup.string().email("Please enter a valid email").required('Email address is required'),
    password: yup.string().min(8, ({min}) => `Password must be at least ${min} characters`)
        .max(15, ({max}) => `Password must be max ${max} characters`).required('Password is required'),
});

export default registrationValidationSchema
