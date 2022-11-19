import React from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {StatusBar} from "react-native";
import authStore from "../storage/authStore";
import {Formik} from "formik";
import reservationsValidationSchema from "../validates/reservationsValidationSchema";
import moment from 'moment';
import reservationStore from "../storage/reservationStore";
import {useNavigation} from "@react-navigation/native";
import timeCreatingHandler from "../handlers/timeCreatingHandler";
import MyFormCreatingScreen from "../components/MyFormCreatingScreen";

const CreatingReservationScreen = () => {

    const navigation = useNavigation()

    const createNewReservation = async (reservation) => {
        const data = await reservationStore.createReservation(reservation)
        navigation.navigate('MyReservations')
        return data
    }

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
