import React from 'react';
import {observer} from "mobx-react";
import {Text, StyleSheet} from "react-native";
import {Flex} from "@react-native-material/core";

const TimeItem = ({item}) => {
    return (
        <Flex style={styles.itemWrapper}>
            {
                item.isFree ?
                    <Text style={[styles.time, styles.freeTime]}>
                        {item.time}
                    </Text> :
                    <Text style={[styles.time, styles.busyTime]}>
                        {item.time}
                    </Text>
            }
        </Flex>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "center",
        width: "24%"
    },
    time: {
        fontSize: 17,
        marginBottom: 20,
        marginRight: 13
    },
    freeTime: {
        color: "green"
    },
    busyTime: {
        color: "red"
    }
})

export default observer(TimeItem);
