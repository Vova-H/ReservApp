import React from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {StatusBar} from "react-native";
import authStore from "../storage/authStore";
import {Formik} from "formik";
import reservationsValidationSchema from "../validates/reservationsValidationSchema";
import reservationStore from "../storage/reservationStore";
import {useNavigation} from "@react-navigation/native";
import MyFormUpdatingScreen from "../components/MyFormUpdatingScreen";

const UpdatingReservationScreen = observer(() => {

    const navigation = useNavigation()
    const oldReservation = reservationStore.editReservationItem

    const updatingReservation = async (id, values) => {
        try {
            const data = await reservationStore.updateReservation(id, values)
            if (data.errors) {
                data.errors.map((el)=>{
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
                                handleSubmit={props.handleSubmit}/>
                    )}
                </Formik>
            </Flex>
        </Flex>
    )
})

export default UpdatingReservationScreen;
