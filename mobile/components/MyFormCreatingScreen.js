import moment from "moment/moment";
import {Button, Flex} from "@react-native-material/core";
import {StyleSheet, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useState} from "react";

const MyFormCreatingScreen = props => {
    const {handleSubmit, values, setFieldValue} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisibility, setTimePickerVisibility] = useState(false)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = date => {
        setFieldValue('date', moment(date).format('YYYY-MM-DD'))
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
            <Button title="Create" onPress={handleSubmit}/>
        </Flex>
    )
}


const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 26,
        textTransform: "uppercase",
    }
})

export default MyFormCreatingScreen
