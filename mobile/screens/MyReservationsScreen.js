import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text} from "react-native";
import {Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import ReservationItem from "../components/UI/ReservationItem";
import reservationStore from "../storage/reservationStore";
import Header from "../components/UI/Header";
import {useNavigation} from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


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
        const ac = new AbortController()
        fetchData({signal: ac.signal}).then()
        return () => {
            ac.abort()
        }
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
                <Flex style={styles.buttonCreateWrapper}>
                    <Button
                        trailing={props => <Icon name="plus" style={styles.iconCreate} {...props} />}
                        onPress={() => {
                            navigation.navigate("Creating")
                        }}
                        style={styles.buttonCreate}
                    />
                </Flex>
            </Flex>
        </>
    );
}


const styles = StyleSheet.create({

    buttonCreateWrapper: {
        height: "8%"
    },
    buttonCreate: {
        justifyContent: "center",
        height: "100%",
    },
    iconCreate: {
        fontSize: 40
    }
})

export default observer(MyReservationsScreen);
