import React from 'react';
import {Flex} from "@react-native-material/core";
import {StyleSheet, Text} from "react-native";
import {observer} from "mobx-react";
import moment from "moment/moment";

const UserItem = ({item}) => {

    const {name, surname, email, createdAt} = item

    return (
        <Flex style={styles.itemWrapper}>
            <Flex>
                <Text>
                    Client: {name} {surname}
                </Text>
            </Flex>
            <Flex>
                <Text>
                    Email: {email}
                </Text>
            </Flex>
            <Flex>
                <Text>
                    Registered: {moment(createdAt).format("YYYY-MM-DD")}
                </Text>
            </Flex>
        </Flex>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        minWidth: "98%",
        marginBottom: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: "#dcdcdc",
        paddingVertical: "2%",
        paddingLeft: "5%"
    }
})

export default observer(UserItem);
