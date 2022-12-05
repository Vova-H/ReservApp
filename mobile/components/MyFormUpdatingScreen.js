import moment from "moment/moment";
import {Button, Flex} from "@react-native-material/core";
import {Text, StyleSheet} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useEffect, useState} from "react";
import TimeItem from "./UI/TimeItem";
import reservationStore from "../storage/reservationStore";
import CheckingWorkingTimeModal from "./CheckingWorkingTimeModal";

const MyFormUpdatingScreen = props => {
    const {handleSubmit, values, setFieldValue, oldDay} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)

    const [day, setDay] = useState(oldDay)
    const [isAvailableTime, setIsAvailableTime] = useState(false)

    useEffect(() => {
        fetchTime()
    }, [day])

    const fetchTime = async () => {
        await handleDateToChecking(day)
    }

    const handleDateToChecking = async (date) => {
        await reservationStore.getAvailableTime({"date": date})
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
                    <Text onPress={showDatePicker}
                          style={{fontSize: 40, textAlign: "center", marginBottom: "5%", marginTop: "10%"}}
                    >{moment(values.date).format('YYYY-MM-DD')}</Text>
                    <Text onPress={showTimePicker}
                          style={{fontSize: 40, textAlign: "center", marginBottom: "5%"}}
                    >{values.time} </Text>
                    <Picker
                        selectedValue={values.action}
                        onValueChange={async (itemValue, itemIndex) => {
                            await handleAction(itemValue)
                        }}
                        style={{
                            width: "80%",
                            justifyContent: "center",
                            alignSelf: "center",
                        }}
                    >
                        <Picker.Item style={styles.pickerItem} label="to open sick list" value="to open sick list"/>
                        <Picker.Item style={styles.pickerItem} label="to get analyses" value="to get analyses"/>
                        <Picker.Item style={styles.pickerItem} label="to make a declaration"
                                     value="to make a declaration"/>
                        <Picker.Item style={styles.pickerItem} label="to get prescription for painkillers"
                                     value="to get prescription for painkillers"/>
                    </Picker>
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
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                        data={values.time}
                        minuteInterval={15}
                    />
                </Flex>
                <Text style={{fontSize: 24, marginVertical: 10}}
                      onPress={() => {
                          setIsAvailableTime(!isAvailableTime)
                      }}>
                    Click here to check available time...
                </Text>
            </Flex>
            <Flex style={styles.updateButtonWrapper}>
                <Button title="Update"
                        onPress={handleSubmit}
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
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: "5%"
    },
    pickerItem: {
        fontSize: 26,
        textTransform: "uppercase",
    },

    updateButtonWrapper: {
        width: "70%",
        alignSelf: "center"
    }
})

export default MyFormUpdatingScreen
