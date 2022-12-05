import React from 'react';
import {Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {Formik} from "formik";
import reservationsValidationSchema from "../validates/reservationsValidationSchema";
import moment from 'moment';
import reservationStore from "../storage/reservationStore";
import {useNavigation} from "@react-navigation/native";
import timeCreatingHandler from "../handlers/timeCreatingHandler";
import MyFormCreatingScreen from "../components/MyFormCreatingScreen";
import Header from "../components/UI/Header";

const CreatingReservationScreen = () => {

    const navigation = useNavigation()

    const createNewReservation = async (reservation) => {
        const data = await reservationStore.createReservation(reservation)
        navigation.navigate('MyReservations')
        return data
    }

    return (
        <Flex fill>
            <Header title={"New Reservation"}/>
            <Flex style={{flex: 1}}>
                <Formik
                    initialValues={
                        {
                            date: moment().format('YYYY-MM-DD'),
                            time: timeCreatingHandler,
                            action: "to open sick list"
                        }
                    }
                    validationSchema={reservationsValidationSchema}
                    onSubmit={async (values) => {
                        await createNewReservation(values)
                    }}
                >
                    {(props) => (
                        <MyFormCreatingScreen values={props.values} setFieldValue={props.setFieldValue}
                                              handleSubmit={props.handleSubmit}
                        />
                    )}
                </Formik>
            </Flex>
        </Flex>
    )
}

export default observer(CreatingReservationScreen);
