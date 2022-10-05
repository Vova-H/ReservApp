import React, {useEffect} from 'react';
import {FlatList, StatusBar, Text} from "react-native";
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import authStore from "../storage/authStore";
import ReservationItem from "../components/ReservationItem";
import {useNavigation} from "@react-navigation/native";
import reservationStore from "../storage/reservationStore";


const MyReservationsScreen = observer(() => {

    const navigation = useNavigation()

    const fetchData = async () => {
        try {
            await reservationStore.getReservations()
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
    }, [fetchData])


    const renderReservations = ({item}) => (
        <ReservationItem item={item}/>
    )

    return (
        <>
            <Flex fill>
                <StatusBar hidden/>
                <AppBar
                    title='My Reservations'
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
                <Flex fill items={"center"} justify={"center"}>
                    {
                        reservationStore.reservations.length === 0 ?
                            <Text style={{marginBottom: 20}}> You don't have any reservations </Text> :
                            <FlatList data={reservationStore.reservations}
                                      renderItem={renderReservations}
                                      keyExtractor={item => {
                                          item.id
                                      }}
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
})


export default MyReservationsScreen;
