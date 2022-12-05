import React, {useEffect} from 'react';
import {FlatList, Text} from "react-native";
import {Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import ReservationItem from "../components/UI/ReservationItem";
import reservationStore from "../storage/reservationStore";
import Header from "../components/UI/Header";
import {useNavigation} from "@react-navigation/native";


const MyReservationsScreen = () => {

    const navigation = useNavigation()

    const fetchData = async () => {
        try {
            return await reservationStore.getReservations()
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
        fetchData().then()
    }, [])


    const renderReservations = ({item}) => (
        <ReservationItem item={item} showClient={false}/>
    )

    return (
        <>
            <Flex fill style={{justifyContent: "space-between"}}>
                <Header title={"My Reservations"}/>
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
