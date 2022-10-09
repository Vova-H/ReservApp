import React from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity} from "react-native";
import authStore from "../storage/authStore";
import AuthStore from "../storage/authStore";
import {useNavigation} from "@react-navigation/native";
import adminStore from "../storage/adminStore";
import ReservationItem from "../components/ReservationItem";

const AdminScreen = observer(() => {

    const navigation = useNavigation()


    const renderReservations = ({item}) => (
        <ReservationItem item={item}/>
    )

    return (
        <Flex style={{flex: 1, justifyContent: "space-between"}}>
            <StatusBar hidden/>
            <AppBar
                title='My Reservations'
                subtitle={
                    AuthStore.isAdmin ?
                        <TouchableOpacity>
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
                            navigation.navigate("Login")
                        }}
                        {...props}
                    />
                }
            />
            <Flex items={"center"} justify={"center"} style={{height:"70%"}}>
                <FlatList data={adminStore.allReservations}
                          renderItem={renderReservations}
                          keyExtractor={(item) => item.id}
                />
            </Flex>
            <Flex>

                <Button title="Show all registered users"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            await adminStore.getAllUsers()
                        }}
                />
                <Button title="Show all reservations"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            await adminStore.getAllReservations()
                        }}
                />
            </Flex>

        </Flex>
    );
})

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        width: "70%",
        marginBottom: "5%"
    }
})

export default AdminScreen;
