import React, {useEffect} from 'react';
import {FlatList, StatusBar, Text} from "react-native";
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import reservationStore from "../storage/reservationStore";
import authStore from "../storage/authStore";


const MyReservationsScreen = observer(({navigation}) => {

    useEffect(() => {
        (async () => {
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
        })()
    }, [reservationStore.reservations])


    const renderReservations = ({item}) => (
        <Flex direction={"row"} items={"center"}
              style={{marginBottom: 20, marginTop: 20, paddingHorizontal: "5%", borderBottomWidth: 1, borderTopWidth:1, backgroundColor:"#dcdcdc"}}>
            <Flex justify={"center"} style={{paddingRight:"2%" , marginRight: "10%", borderRightWidth:1}}>
                <Text>{item.time}</Text>
                <Text>{item.date}</Text>
            </Flex>
            <Flex direction={"row"} wrap={"wrap"}><Text
                style={{textTransform: "uppercase", width: "80%"}}>{item.action}</Text>
            </Flex>
        </Flex>
    )

    return (
        <Flex fill>
            <StatusBar hidden/>
            <AppBar
                title='MyReservationsScreen'
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
                        reservationStore.reservations ?
                            <FlatList data={reservationStore.reservations} renderItem={renderReservations}
                                      keyExtractor={item => item.id}/> : null
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
    );
})

export default MyReservationsScreen;
