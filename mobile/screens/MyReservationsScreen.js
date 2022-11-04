import React, {useEffect} from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity} from "react-native";
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import authStore from "../storage/authStore";
import AuthStore from "../storage/authStore";
import ReservationItem from "../components/ReservationItem";
import adminStore from "../storage/adminStore";
import reservationStore from "../storage/reservationStore";
import {runInAction} from "mobx";


const MyReservationsScreen = ({navigation}) => {

    // exitHandler()

    const fetchData = async () => {
        try {
            return reservationStore.getReservations()
        } catch (e) {
            navigation.navigate('Login')
            switch (e.response.status) {
                case 404 :
                    alert('Page not found')
                    break;
                case 403:
                    alert('Access forbidden')
                    break
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const renderReservations = ({item}) => (
        <ReservationItem item={item}/>
    )

    return (
        <>
            <Flex fill>
                <StatusBar hidden/>
                <AppBar
                    title='My Reservations'
                    subtitle={
                        AuthStore.isAdmin ?
                            <TouchableOpacity onPress={() => {
                                adminStore.allReservations = []
                                navigation.navigate("Admin")
                            }}>
                                <Text style={{color: "white"}}>{authStore.client.email} (Admin)</Text>
                            </TouchableOpacity> :
                            <Text style={{color: "white"}}>{authStore.client.email}</Text>
                    }
                    trailing={props =>
                        <Button
                            variant="text"
                            title="Logout"
                            compact
                            style={{marginEnd: 4}}
                            onPress={() => {
                                authStore.logout()
                                runInAction(() =>
                                    reservationStore.reservations = []
                                )

                                navigation.navigate("Login")
                            }}
                            {...props}
                        />
                    }
                />
                <Flex fill items={"center"} justify={"center"}>
                    {
                        reservationStore.reservations.length === 0 ?
                            <Text style={{marginBottom: 20}}> You don't have any reservations </Text> :
                            <FlatList data={reservationStore.reservations}
                                      renderItem={renderReservations}
                                      keyExtractor={
                                          item => {
                                              return item.id
                                          }
                                      }
                            />
                    }
                </Flex>
                <Flex>
                    <Button title={"Create"}
                            onPress={() => {
                                navigation.navigate("Creating")
                            }}
                    />
                </Flex>
            </Flex>
        </>
    );
}


export default observer(MyReservationsScreen);
