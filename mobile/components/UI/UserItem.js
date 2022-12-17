import React from 'react';
import {Flex} from "@react-native-material/core";
import {StyleSheet, Text} from "react-native";
import {observer} from "mobx-react";
import moment from "moment/moment";

const UserItem = ({item}) => {

    const {name, surname, phone, email, createdAt} = item

    return (
        <Flex style={styles.userWrapper}>
            <Flex style={styles.itemWrapper}>
                <Text style={styles.itemLabel}>Client: </Text>
                <Text style={styles.item}>{name} {surname}</Text>
            </Flex>
            <Flex style={styles.itemWrapper}>
                <Text style={styles.itemLabel}>Email: </Text>
                <Text style={styles.item}>{email}</Text>
            </Flex>

            <Flex style={styles.itemWrapper}>
                <Text style={styles.itemLabel}>Phone: </Text>
                <Text style={styles.item}>{phone}</Text>
            </Flex>

            <Flex style={styles.itemWrapper}>
                <Text style={styles.itemLabel}>Registered: </Text>
                <Text style={styles.item}>{moment(createdAt).format("YYYY-MM-DD")}</Text>
            </Flex>
        </Flex>
    )
}

const styles = StyleSheet.create({
    userWrapper: {
        minWidth: "98%",
        marginBottom: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: "#dcdcdc",
        paddingVertical: "2%",
        paddingLeft: "5%"
    },
    itemWrapper: {
        flexDirection: "row",
        alignItems:"center"
    },
    itemLabel: {
        fontSize: 16,
        textTransform: "uppercase"
    },
    item: {
        fontSize: 20,
        textDecorationLine: "underline",
    }
})

export default observer(UserItem);
