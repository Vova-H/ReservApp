import React from 'react';
import {Flex, IconButton} from "@react-native-material/core";
import {Text} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import reservationStore from "../storage/reservationStore";
import {observer} from "mobx-react";
import {useNavigation} from "@react-navigation/native";

const ReservationItem = observer(({item}) => {
    const navigation = useNavigation()

    const {isValidStatus} = item

    return (
        <Flex direction={"row"} items={"center"}
              style={{
                  marginBottom: 20,
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  backgroundColor: "#dcdcdc",
                  width: "100%",
                  paddingVertical:"2%"
              }}>
            <Flex justify={"center"}
                  style={{paddingHorizontal:"2%", paddingVertical:"2%", marginRight: "5%", borderRightWidth: 1}}>
                <Text>{item.time}</Text>
                <Text>{item.date}</Text>
            </Flex>
            <Flex direction={"row"} wrap={"wrap"} style={{width: "45%"}}>
                <Text style={{textTransform: "uppercase", width: "100%"}}>{item.action} </Text>
                {isValidStatus === false && <Text style={{color: "red"}}>Not Active</Text>}
            </Flex>
            <Flex style={{flexDirection: "row", justifyContent: "space-around"}}>
                <Flex diraction={"row"} style={{width: "10%", marginRight: "2%"}}>
                    <IconButton
                        onPress={async () => {
                            reservationStore.editReservationItem = item
                            await navigation.navigate('Editing')
                        }}
                        icon={props => <Icon name="pencil" {...props} color="#5B798FFF"/>}/>
                </Flex>
                <Flex diraction={"row"} style={{width: "10%"}}>
                    <IconButton onPress={() => reservationStore.deleteReservation(item.id)}
                                icon={props => <Icon name="trash-can" {...props} color="red"/>}/>
                </Flex>
            </Flex>
        </Flex>
    )
})

export default ReservationItem;
