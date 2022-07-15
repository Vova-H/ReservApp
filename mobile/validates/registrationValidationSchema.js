import * as yup from 'yup'

const registrationValidationSchema = yup.object().shape({

    name: yup.string().required('Name is Required'),
    surname: yup.string().required('Surname is Required'),
    email: yup.string().email("Please enter valid email").required('Email Address is Required'),
    password: yup.string().min(8, ({min}) => `Password must be at least ${min} characters`)
        .max(15, ({max}) => `Password must be max ${max} characters`).required('Password is required'),
});


export default registrationValidationSchema
