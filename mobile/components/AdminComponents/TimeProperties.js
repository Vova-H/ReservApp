import React from 'react';
import {Button, Flex} from "@react-native-material/core";
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";
import adminStore from "../../storage/adminStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimeProperties = (props) => {
    const {
        showStartOfDayPicker,
        isStartOfDayTimePickerVisible,
        handleStartOfDayConfirm,
        hideStartOfDayPicker,
        showEndOfDayPicker,
        isEndOfDayTimePickerVisible,
        handleEndOfDayConfirm,
        hideEndOfDayPicker,
        updateWorkingTime,
    } = props
    return (
        <Flex>
            <Flex items={"center"} justify={"center"} style={styles.timePropertyContent}>
                <TouchableOpacity onPress={showStartOfDayPicker} style={styles.startOfDayTimeWrapper}>
                    <Text style={styles.time} >{adminStore.startOfDay}</Text>
                    <Text style={styles.timeSubtitle}>Click here to change start of day</Text>
                    <DateTimePickerModal
                        isVisible={isStartOfDayTimePickerVisible}
                        mode="time"
                        is24Hour={false}
                        minuteInterval={30}
                        onConfirm={handleStartOfDayConfirm}
                        onCancel={hideStartOfDayPicker}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={showEndOfDayPicker} style={styles.endOfDayTimeWrapper}>
                    <Text style={styles.time}>{adminStore.endOfDay}</Text>
                    <Text style={styles.timeSubtitle}>Click here to change end of day</Text>
                    <DateTimePickerModal
                        isVisible={isEndOfDayTimePickerVisible}
                        mode="time"
                        is24Hour={false}
                        minuteInterval={30}
                        onConfirm={handleEndOfDayConfirm}
                        onCancel={hideEndOfDayPicker}
                    />
                </TouchableOpacity>
                <Button title="Save changes" color="green" onPress={() => {
                    updateWorkingTime(
                        {
                            startOfDay: adminStore.startOfDay,
                            endOfDay: adminStore.endOfDay
                        }
                    ).then((res) => {
                        Alert.alert("Time Properties", res[0].message)
                    })
                }}/>
            </Flex>
        </Flex>
    );
};

const styles = StyleSheet.create({
    timePropertyContent: {
        height: "70%",
    },
    time: {
        fontSize: 60,
        fontWeight: "800",
    },
    timeSubtitle: {
        opacity: 0.4
    },
    startOfDayTimeWrapper: {
        marginBottom: "5%",
        alignItems: "center"
    },
    endOfDayTimeWrapper: {
        marginBottom: "10%",
        alignItems: "center"
    },
    startOfDayTime: {},
    endOfDayTime: {},
})

export default TimeProperties;
