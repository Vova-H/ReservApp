import moment from "moment/moment";
import {Button, Flex, Icon, IconButton} from "@react-native-material/core";
import {Modal, StyleSheet, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useEffect, useState} from "react";
import reservationStore from "../storage/reservationStore";
import TimeItem from "./UI/TimeItem";

const MyFormCreatingScreen = props => {
    const {handleSubmit, values, setFieldValue} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)
    const [isAvailableTime, setIsAvailableTime] = useState(false)
    const [day, setDay] = useState(moment(Date.now()).format('YYYY-MM-DD'))

    useEffect(() => {
        fetchTime()
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
        <Flex style={{flexDirection: "column", alignContent: "space-between"}}>
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
                    <Picker.Item style={styles.pickerItem} label="to make a declaration" value="to make a declaration"/>
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
            <Button title="Create"
                    color="green"
                    onPress={handleSubmit}
            />
            <Modal transparent={true} animationType={"slide"} visible={isAvailableTime}>
                <Flex style={styles.modalContainer}>
                    <Flex style={styles.modalSubContainer}>
                        <Flex style={styles.closeContentWrapper}>
                            <Text style={styles.closeButton}>Working Time</Text>
                            <IconButton
                                onPress={() => {
                                    setIsAvailableTime(!isAvailableTime)
                                }}
                                icon={props => <Icon name="close" {...props} color="#5B798FFF"/>}
                            />
                        </Flex>
                        <Flex style={styles.modalContentWrapper}>
                            {
                                reservationStore?.availableTimes?.map((el, index) => {
                                    return renderWorkingTime({el, index})
                                })
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Modal>
        </Flex>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalSubContainer: {
        width: "90%",
        height: "88%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContentWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        justifyContent: "center",
    },

    closeContentWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10

    },
    pickerItem: {
        fontSize: 26,
        textTransform: "uppercase",
    },
    closeButton: {
        fontSize: 20,
    }
})

export default MyFormCreatingScreen
