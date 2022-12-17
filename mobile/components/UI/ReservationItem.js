import React, {useState} from 'react';
import {Flex, IconButton} from "@react-native-material/core";
import {StyleSheet, Text, TouchableWithoutFeedback} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import reservationStore from "../../storage/reservationStore";
import {observer} from "mobx-react";
import {useNavigation} from "@react-navigation/native";
import authStore from "../../storage/authStore";
import InfoClientModal from "../modalComponents/InfoClientModal";

const ReservationItem = observer(({item, showClient}) => {
    const navigation = useNavigation()

    const {isValidStatus, action, date, time, client, id} = item
    const [isClientInfo, setIsClientInfo] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback delayLongPress="1000" onLongPress={() => setIsClientInfo(!isClientInfo)}>
                <Flex direction={"row"} items={"center"} style={styles.itemWrapper}>
                    <Flex justify={"center"}
                          style={styles.item}>
                        <Text style={styles.timeItem}>{time}</Text>
                        <Text style={styles.dateItem}>{date}</Text>
                        {isValidStatus === false &&
                            <Text style={styles.statusItem}>Not Active</Text>
                        }
                    </Flex>

                    <Flex direction={"column"} wrap={"wrap"} style={styles.actionWrapper}>
                        <Text style={styles.action}>{action}</Text>
                        {authStore.isAdmin && showClient ? <Text>( {client[0]} {client[1]} )</Text> : null}
                    </Flex>
                    <Flex direction={"row"} justify={"space-around"}>
                        {
                            isValidStatus && <Flex diraction={"row"} style={styles.editIconWrapper}>
                                <IconButton
                                    onPress={() => {
                                        reservationStore.editReservationItem = item
                                        navigation.navigate('Editing')
                                    }}
                                    icon={props => <Icon name="pencil" style={styles.icons} {...props}
                                                         color="#5B798FFF"/>}/>
                            </Flex>}
                        <Flex diraction={"row"} style={styles.deleteIconWrapper}>
                            <IconButton onPress={() => reservationStore.deleteReservation(id)}
                                        icon={props => <Icon name="trash-can" style={styles.icons} {...props}
                                                             color="red"/>}/>
                        </Flex>
                    </Flex>
                </Flex>
            </TouchableWithoutFeedback>

            {isClientInfo && authStore.isAdmin ?
                <InfoClientModal
                    isClientInfo={isClientInfo}
                    setIsClientInfo={setIsClientInfo}
                    item={item}
                /> : null
            }
        </>
    )
})


const styles = StyleSheet.create({
    itemWrapper: {
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: "#dcdcdc",
        minWidth: "100%",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        height: 120
    },
    item: {
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        marginRight: "5%",
        borderRightWidth: 1
    },
    dateItem: {
        fontSize: 15
    },
    timeItem: {
        fontSize: 15
    },
    statusItem: {
        color: "red",
        fontSize: 15
    },
    actionWrapper: {
        width: "45%"
    },
    action: {
        textTransform: "uppercase",
        width: "100%",
        fontSize: 17
    },
    icons: {
        fontSize: 30
    },
    editIconWrapper: {
        width: "10%",
        marginRight: "2%"
    },
    deleteIconWrapper: {
        width: "10%"
    }
})

export default ReservationItem;
