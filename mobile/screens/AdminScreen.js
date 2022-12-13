import React, {useState} from 'react';
import {Button, Flex} from "@react-native-material/core";
import {observer} from "mobx-react";
import {StyleSheet} from "react-native";
import adminStore from "../storage/adminStore";
import {runInAction} from "mobx";
import ReservationItem from "../components/UI/ReservationItem";
import UserItem from "../components/UI/UserItem";
import Header from "../components/UI/Header";
import TimeProperties from "../components/AdminComponents/TimeProperties";
import AllReservations from "../components/AdminComponents/AllReservations";
import RegisteredUsers from "../components/AdminComponents/RegisteredUsers";


const AdminScreen = () => {

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
        <ReservationItem item={item} showClient={true}/>
    )
    const renderAllUsers = ({item}) => (
        <UserItem item={item}/>
    )

    const updateWorkingTime = async (time) => {
        return await adminStore.updateWorkingTime(time)
    }


    return (
        <Flex style={{flex: 1, justifyContent: "space-between"}}>
            <Header title={"Admin Page"}/>
            {
                showTimeProperty ?
                    <TimeProperties showStartOfDayPicker={showStartOfDayPicker}
                                    isStartOfDayTimePickerVisible={isStartOfDayTimePickerVisible}
                                    handleStartOfDayConfirm={handleStartOfDayConfirm}
                                    hideStartOfDayPicker={hideStartOfDayPicker}
                                    showEndOfDayPicker={showEndOfDayPicker}
                                    isEndOfDayTimePickerVisible={isEndOfDayTimePickerVisible}
                                    handleEndOfDayConfirm={handleEndOfDayConfirm}
                                    hideEndOfDayPicker={hideEndOfDayPicker}
                                    updateWorkingTime={updateWorkingTime}
                    /> : null
            }

            {
                showAllReservations ?
                    <AllReservations
                        renderAllReservations={renderAllReservations}
                    /> : null
            }
            {
                showAllUsers ?
                    <RegisteredUsers renderAllUsers={renderAllUsers}/> : null
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
