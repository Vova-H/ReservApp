import React from 'react';
import {Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {Formik} from "formik";
import reservationsValidationSchema from "../validates/reservationsValidationSchema";
import reservationStore from "../storage/reservationStore";
import {useNavigation} from "@react-navigation/native";
import MyFormUpdatingScreen from "../components/MyFormUpdatingScreen";
import Header from "../components/UI/Header";

const UpdatingReservationScreen = observer(() => {

    const navigation = useNavigation()
    const oldReservation = reservationStore.editReservationItem

    const updatingReservation = async (id, values) => {
        try {
            const data = await reservationStore.updateReservation(id, values)
            if (data.errors) {
                data.errors.map((el) => {
                    alert(el.message)
                })
            } else {
                alert("Your reservation was updating successfully")
            }
            navigation.navigate('MyReservations')
            return data[1]
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Flex fill>
            <Header title={"Update Reservation"}/>
            <Flex style={{flex: 1}}>
                <Formik
                    initialValues={
                        {
                            date: oldReservation.date,
                            time: oldReservation.time,
                            action: oldReservation.action
                        }
                    }
                    validationSchema={reservationsValidationSchema}
                    onSubmit={(values) => updatingReservation(oldReservation.id, values)}
                >
                    {(props) => (
                        <MyFormUpdatingScreen values={props.values} setFieldValue={props.setFieldValue}
                                              handleSubmit={props.handleSubmit} oldDay={oldReservation.date}/>
                    )}
                </Formik>
            </Flex>
        </Flex>
    )
})

export default UpdatingReservationScreen;
