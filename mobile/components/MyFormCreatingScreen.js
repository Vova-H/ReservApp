import moment from "moment/moment";
import {Button, Flex} from "@react-native-material/core";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useEffect, useState} from "react";
import reservationStore from "../storage/reservationStore";
import TimeItem from "./UI/TimeItem";
import CheckingWorkingTimeModal from "./modalComponents/CheckingWorkingTimeModal";

const MyFormCreatingScreen = props => {
    const {handleSubmit, values, setFieldValue} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)
    const [isAvailableTime, setIsAvailableTime] = useState(false)
    const [day, setDay] = useState(moment(Date.now()).format('YYYY-MM-DD'))

    useEffect(() => {
        fetchTime().then()
    }, [day])

    const fetchTime = async () => {
        await handleDateToChecking(day)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = date => {
        setFieldValue('date', moment(date).format('YYYY-MM-DD'))
        setDay(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();
    };

    const handleDateToChecking = async (date) => {
        await reservationStore.getAvailableTime({"date": date})
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = time => {
        time = moment(time).format("LT")
        if (time.includes("PM")) {
            const timeArray = time.split(" ")
            const newTimeArray = timeArray[0].split(":")
            const hours = parseInt(newTimeArray[0])
            newTimeArray[0] = hours + 12
            newTimeArray[0] = newTimeArray[0].toString()
            time = newTimeArray.join(":")
            setFieldValue('time', time)
        } else {
            time = time.split(" ")
            setFieldValue('time', time[0])
        }
        hideTimePicker()
    };

    const handleAction = (action) => {
        setFieldValue('action', action)
    }

    const renderWorkingTime = ({el, index}) => (
        <TimeItem item={el} key={index} setModal={setIsAvailableTime}/>
    )

    return (
        <Flex style={styles.mainContainer}>
            <Flex>
                <Flex>
                    <TouchableOpacity style={styles.datePickerWrapper} onPress={showDatePicker}>
                        <Text style={styles.datePicker}>
                            {moment(values.date).format('YYYY-MM-DD')}
                        </Text>
                        <Text style={styles.timeSubtitle}>Click here to change day</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.timePickerWrapper} onPress={showTimePicker}>
                        <Text style={styles.timePicker}>
                            {values.time}
                        </Text>
                        <Text style={styles.timeSubtitle}>Click here to change time</Text>
                    </TouchableOpacity>

                    <Flex style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={values.action}
                            onValueChange={async (itemValue, itemIndex) => {
                                await handleAction(itemValue)
                            }}
                            style={styles.picker}
                        >

                            <Picker.Item style={styles.pickerItem} label="To open sick list" value="To open sick list"/>
                            <Picker.Item style={styles.pickerItem} label="To get analyses" value="To get analyses"/>
                            <Picker.Item style={styles.pickerItem} label="To make a declaration"
                                         value="To make a declaration"/>
                            <Picker.Item style={styles.pickerItem} label="To get prescription"
                                         value="To get prescription"/>
                        </Picker>
                    </Flex>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                        data={moment(values.date).format('YYYY-MM-DD')}
                        minimumDate={new Date(Date.now())}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisibility}
                        mode="time"
                        is24Hour={false}
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                        data={values.time}
                        minuteInterval={15}
                    />
                </Flex>


                <Flex style={styles.availableTimeLabelWrapper}>
                    <Text style={styles.availableTimeLabel}
                          onPress={() => {
                              setIsAvailableTime(!isAvailableTime)
                          }}>
                        Check available time
                    </Text>
                </Flex>
            </Flex>
            <Flex style={styles.createButtonWrapper}>
                <Button title="Create"
                        onPress={handleSubmit}
                        style={styles.createButton}
                        titleStyle={styles.createButtonTitle}
                />
            </Flex>


            <CheckingWorkingTimeModal isAvailableTime={isAvailableTime}
                                      setIsAvailableTime={setIsAvailableTime}
                                      renderWorkingTime={renderWorkingTime}
            />
        </Flex>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        justifyContent: "space-between",
        paddingBottom: "5%"
    },
    datePickerWrapper: {
        marginTop: "10%"
    },
    datePicker: {
        fontSize: 50,
        fontWeight: "400",
        textAlign: "center",
    },
    dateSubtitle: {
        marginBottom: "10%",
    },
    timePickerWrapper: {},
    timePicker: {
        fontSize: 50,
        fontWeight: "400",
        textAlign: "center",
    },
    timeSubtitle: {
        marginBottom: "10%",
        textAlign: "center",
        opacity: 0.4
    },
    pickerWrapper: {
        borderWidth: 1,
        borderRadius: 40,
        marginBottom: "15%"
    },
    picker: {
        width: "80%",
        justifyContent: "center",
        alignSelf: "center",
    },
    pickerItem: {
        fontSize: 26,
        borderStyle: "solid"
    },
    availableTimeLabelWrapper: {
        paddingHorizontal: "5%",
    },
    availableTimeLabel: {
        fontSize: 30,
        marginVertical: 10,
        textAlign: "center",
        textDecorationLine: "underline"
    },
    createButtonWrapper: {
        width: "70%",
        alignSelf: "center",
        justifyContent: "center",
    },
    createButton: {
        justifyContent: "center",
        paddingVertical: "5%"
    },
    createButtonTitle: {
        fontSize: 17,
        letterSpacing: 4,
    }
})

export default MyFormCreatingScreen
