import * as yup from 'yup'

const registrationValidationSchema = yup.object().shape({
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
    action: yup.string().required('You must to choose an action ')
});


export default registrationValidationSchema
