import React, {useState} from 'react';
import {AppBar, Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity} from "react-native";
import authStore from "../storage/authStore";
import AuthStore from "../storage/authStore";
import adminStore from "../storage/adminStore";
import {runInAction} from "mobx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ReservationItem from "../components/ReservationItem";
import UserItem from "../components/UserItem";


const AdminScreen = ({navigation}) => {

    const [showAllReservations, setShowAllReservations] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(false)
    const [showTimeProperty, setShowTimeProperty] = useState(false)


    const [isStartOfDayTimePickerVisible, setStartOfDayTimePickerVisible] = useState(false);
    const [isEndOfDayTimePickerVisible, setEndOfDayTimePickerVisible] = useState(false);

    const showStartOfDayPicker = () => {
        setStartOfDayTimePickerVisible(true);
    };

    const hideStartOfDayPicker = () => {
        setStartOfDayTimePickerVisible(false);
    };

    const handleStartOfDayConfirm = (data) => {
        const time = data.toTimeString().split(":")
        const stringTime = `${time[0]}:${time[1]}`
        runInAction(() => {
            adminStore.startOfDay = stringTime
        })
        hideStartOfDayPicker();
    };

    const showEndOfDayPicker = () => {
        setEndOfDayTimePickerVisible(true);
    };

    const hideEndOfDayPicker = () => {
        setEndOfDayTimePickerVisible(false);
    };

    const handleEndOfDayConfirm = (data) => {
        const time = data.toTimeString().split(":")
        const stringTime = `${time[0]}:${time[1]}`
        runInAction(() => {
            adminStore.endOfDay = stringTime
        })
        hideEndOfDayPicker();
    };


    const renderAllReservations = ({item}) => (
        <ReservationItem item={item}/>
    )
    const renderAllUsers = ({item}) => (
        <UserItem item={item}/>
    )

    const updateWorkingTime = async (time) => {
        return await adminStore.updateWorkingTime(time)
    }


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
                showTimeProperty ?
                    <Flex>
                        <Flex items={"center"} justify={"center"} style={{height: "70%"}}>
                            <Flex>
                                <Text onPress={showStartOfDayPicker}>{adminStore.startOfDay}</Text>
                                <DateTimePickerModal
                                    isVisible={isStartOfDayTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleStartOfDayConfirm}
                                    onCancel={hideStartOfDayPicker}
                                />
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Text onPress={showEndOfDayPicker}>{adminStore.endOfDay}</Text>
                                <DateTimePickerModal
                                    isVisible={isEndOfDayTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleEndOfDayConfirm}
                                    onCancel={hideEndOfDayPicker}
                                />
                            </Flex>
                            <Button title="Save changes" onPress={() => {
                                updateWorkingTime(
                                    {
                                        startOfDay: adminStore.startOfDay,
                                        endOfDay: adminStore.endOfDay
                                    }
                                ).then((res) => {
                                    alert(res[0].message)
                                    setShowTimeProperty(false)
                                })
                            }}/>
                        </Flex>
                    </Flex> : null
            }

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

                <Button title="Show work time properties"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            runInAction(() => {
                                adminStore.startOfDay = ""
                                adminStore.endOfDay = ""
                            })
                            await adminStore.getWorkingTime().then()
                            setShowAllReservations(false)
                            setShowAllUsers(false)
                            setShowTimeProperty(!showTimeProperty)
                        }}
                />

                <Button title="Show all registered users"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            runInAction(() => {
                                adminStore.allUsers = []
                            })
                            await adminStore.getAllUsers()
                            setShowAllReservations(false)
                            setShowTimeProperty(false)
                            setShowAllUsers(!showAllUsers)
                        }}
                />
                <Button title="Show all reservations"
                        uppercase={true}
                        style={styles.button}
                        onPress={async () => {
                            runInAction(() => {
                                adminStore.allReservations = []
                            })
                            await adminStore.getAllReservations()
                            setShowAllUsers(false)
                            setShowTimeProperty(false)
                            setShowAllReservations(!showAllReservations)
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
