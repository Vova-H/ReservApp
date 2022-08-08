import React, {useState} from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {StatusBar, Text} from "react-native";
import authStore from "../storage/authStore";
import {Formik} from "formik";
import screenStyle from "../styles/screenStyle";
import reservationsValidationSchema from "../validates/reservationsValidationSchema";
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreatingScreen = observer(({navigation}) => {


    const time = (new Date().getHours() + ":" + new Date().getMinutes())


    return (
        <Flex fill>
            <StatusBar hidden/>
            <AppBar
                title='New Reservation'
                subtitle={authStore.client.email}
                trailing={props =>
                    <Button
                        variant="text"
                        title="Logout"
                        compact
                        style={{marginEnd: 4}}
                        onPress={() => {
                            authStore.logout()
                            navigation.navigate("Login")
                        }}
                        {...props}
                    />
                }
            />

            <Flex>
                <Formik
                    initialValues={
                        {
                            date: moment().format('l')
                            , time: time
                        }
                    }
                    validationSchema={reservationsValidationSchema}
                    onSubmit={async (values) => {
                        console.log(values)
                    }}
                >
                    {(props) => (
                        <MyForm values={props.values} setFieldValue={props.setFieldValue}
                                handleSubmit={props.handleSubmit}/>
                    )}
                </Formik>
            </Flex>
        </Flex>
    )
})


export const MyForm = props => {
    const {handleSubmit, values, setFieldValue} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = date => {
        setFieldValue('date', moment(date).format('l'))
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = time => {
        let hours = time.getHours()
        let minutes = time.getMinutes()
        if (minutes === 0) {
            minutes = "00"
        }
        setFieldValue('time', (hours + ":" + minutes).toString())
        hideTimePicker()
    };

    return (
        <Flex>
            <Text onPress={showDatePicker}>{moment(values.date).format('l')}</Text>
            <Text onPress={showTimePicker}>{values.time} </Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                date={moment(values.date).toDate()}
                minimumDate={new Date(Date.now())}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisibility}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                data={values.time}
                minuteInterval={15}
            />
            <Button title="Create" onPress={handleSubmit}/>
        </Flex>
    )
}

const styles = screenStyle
export default CreatingScreen;
