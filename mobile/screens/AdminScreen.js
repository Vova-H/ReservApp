import React, {useState} from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity} from "react-native";
import authStore from "../storage/authStore";
import AuthStore from "../storage/authStore";
import adminStore from "../storage/adminStore";
import ReservationItem from "../components/ReservationItem";
import {runInAction} from "mobx";
import UserItem from "../components/UserItem";

const AdminScreen = ({navigation}) => {

    const [showAllReservations, setShowAllReservations] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(false)

    const renderAllReservations = ({item}) => (
        <ReservationItem item={item}/>
    )
    const renderAllUsers = ({item}) => (
        <UserItem item={item}/>
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

            {
                showAllReservations ?
                    <Flex items={"center"} justify={"center"} style={{height: "70%"}}>
                        <FlatList data={adminStore.allReservations}
                                  renderItem={renderAllReservations}
                                  keyExtractor={(item) => item.id}
                        />
                    </Flex> : null
            }
            {
                showAllUsers ?
                    <Flex items={"center"} justify={"center"} style={{height: "70%"}}>
                        <FlatList data={adminStore.allUsers}
                                  renderItem={renderAllUsers}
                                  keyExtractor={(item) => item.id}
                        />
                    </Flex> : null
            }

            <Flex>

                <Button title="Show all registered users"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            runInAction(() => {
                                adminStore.allUsers = []
                                setShowAllReservations(false)
                                setShowAllUsers(!showAllUsers)
                            })
                            await adminStore.getAllUsers()
                        }}
                />
                <Button title="Show all reservations"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            runInAction(() => {
                                adminStore.allReservations = []
                                setShowAllUsers(false)
                                setShowAllReservations(!showAllReservations)
                            })
                            await adminStore.getAllReservations()
                        }}
                />
            </Flex>

        </Flex>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        width: "70%",
        marginBottom: "5%"
    }
})

export default observer(AdminScreen);
