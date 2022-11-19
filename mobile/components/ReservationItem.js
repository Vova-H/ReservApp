import React from 'react';
import {Flex, IconButton} from "@react-native-material/core";
import {StyleSheet, Text} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import reservationStore from "../storage/reservationStore";
import {observer} from "mobx-react";
import {useNavigation} from "@react-navigation/native";
import authStore from "../storage/authStore";

const ReservationItem = observer(({item}) => {
    const navigation = useNavigation()

    const {isValidStatus, action, date, time, client, id} = item

    return (
        <Flex direction={"row"} items={"center"} style={styles.itemWrapper}>
            <Flex justify={"center"}
                  style={{paddingHorizontal: "2%", paddingVertical: "2%", marginRight: "5%", borderRightWidth: 1}}>
                <Text>{time}</Text>
                <Text>{date}</Text>
                {isValidStatus === false &&
                    <Text style={{color: "red"}}>Not Active</Text>
                }
            </Flex>

            <Flex direction={"column"} wrap={"wrap"} style={{width: "45%"}}>
                <Text style={{textTransform: "uppercase", width: "100%"}}>{action}</Text>
                {authStore.isAdmin && <Text>( {client} )</Text>}
            </Flex>
            <Flex style={{flexDirection: "row", justifyContent: "space-around"}}>
                <Flex diraction={"row"} style={{width: "10%", marginRight: "2%"}}>
                    <IconButton
                        onPress={() => {
                            reservationStore.editReservationItem = item
                            navigation.navigate('Editing')
                        }}
                        icon={props => <Icon name="pencil" {...props} color="#5B798FFF"/>}/>
                </Flex>
                <Flex diraction={"row"} style={{width: "10%"}}>
                    <IconButton onPress={() => reservationStore.deleteReservation(id)}
                                icon={props => <Icon name="trash-can" {...props} color="red"/>}/>
                </Flex>
            </Flex>
        </Flex>
    )
})


const styles = StyleSheet.create({
    itemWrapper: {
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: "#dcdcdc",
        width: "100%",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderTopStartRadius: 30,
        borderBottomStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        height: 120
    }
})

export default ReservationItem;
