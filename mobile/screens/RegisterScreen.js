import React, {useState} from 'react';
import {
    Alert,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import screenStyle from "../styles/screenStyle";
import {Formik} from "formik";
import registrationValidationSchema from "../validates/registrationValidationSchema";
import {Button} from "@react-native-material/core";
import authStore from "../storage/authStore";
import {observer} from "mobx-react";
import {RadioGroup} from "react-native-btr";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterScreen = (({navigation}) => {

    const [radioButtons, setRadioButtons] = useState([
        {
            id: "1",
            label: "Female",
            value: "Female",
            labelStyle: {
                fontSize: 25,
                fontWeight: "700"
            }
        },
        {
            id: "2",
            label: "Male",
            value: "Male",
            labelStyle: {
                fontSize: 25,
                fontWeight: "700"
            }
        },
    ]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dayOfBirthday, setDayOfBirthday] = useState(moment().format('YYYY-MM-DD'))

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDateConfirm = date => {
        setDayOfBirthday(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();
    };
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={require('../assets/background.jpg')}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <View style={styles.wrapper}>
                        <KeyboardAvoidingView behavior={"height"}>
                            <Formik
                                initialValues={{
                                    name: '',
                                    surname: '',
                                    email: '',
                                    password: '',
                                    phone: '',
                                    gender: "",
                                }}
                                validationSchema={registrationValidationSchema}
                                onSubmit={async (values, actions) => {
                                    values["birthday"] = dayOfBirthday
                                    const res = await authStore.registration(values)
                                    Alert.alert("Registration", res.message)
                                    actions.resetForm()
                                    navigation.navigate('Login')
                                }}
                            >
                                {(props) => (
                                    <View>
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            style={{
                                                height: "65%",
                                                marginBottom: "5%",
                                            }}
                                        >
                                            <Text style={styles.label}>Name</Text>
                                            <TextInput style={styles.input} value={props.values.name}
                                                       onChangeText={props.handleChange('name')}
                                                       onBlur={props.handleBlur('name')}
                                            ></TextInput>
                                            <Text
                                                style={styles.textError}>{props.touched.name && props.errors.name}
                                            </Text>


                                            <Text style={styles.label}>Surname</Text>
                                            <TextInput style={styles.input} value={props.values.surname}
                                                       onChangeText={props.handleChange('surname')}
                                                       onBlur={props.handleBlur('surname')}
                                            ></TextInput>
                                            <Text style={styles.textError}>
                                                {props.touched.surname && props.errors.surname}
                                            </Text>


                                            <Text style={styles.label}>Phone number</Text>
                                            <TextInput style={styles.input} value={props.values.phone}
                                                       keyboardType={"phone-pad"}
                                                       onBlur={props.handleBlur('phone')}
                                                       onChangeText={props.handleChange('phone')}
                                            />
                                            <Text style={styles.textError}>
                                                {props.touched.phone && props.errors.phone}
                                            </Text>

                                            <Text style={styles.label}>Email</Text>
                                            <TextInput style={styles.input} value={props.values.email}
                                                       onChangeText={props.handleChange('email')}
                                                       keyboardType={"email-address"}
                                                       onBlur={props.handleBlur('email')}

                                            ></TextInput>
                                            <Text
                                                style={styles.textError}>{props.touched.email && props.errors.email}
                                            </Text>


                                            <Text style={styles.label}>Password</Text>
                                            <TextInput style={styles.input}
                                                       value={props.values.password}
                                                       onChangeText={props.handleChange('password')}
                                                       textContentType={"password"}
                                                       secureTextEntry={true}
                                                       onBlur={props.handleBlur('password')}
                                            ></TextInput>
                                            <Text
                                                style={styles.textError}>{props.touched.password && props.errors.password}
                                            </Text>

                                            <Text style={styles.label}>Gender</Text>
                                            <View style={{alignItems: "center"}}>
                                                <RadioGroup
                                                    radioButtons={radioButtons}
                                                    onPress={(radioButtons) => {
                                                        setRadioButtons(radioButtons)
                                                        props.values.gender = radioButtons.find(el => el.selected === true).value
                                                    }}
                                                    layout="row"
                                                />
                                            </View>
                                            <Text
                                                style={styles.textError}>{props.touched.gender && props.errors.gender}
                                            </Text>


                                            <Text style={[styles.label, {marginBottom: "5%"}]}>
                                                Date Of Birthday
                                            </Text>
                                            <View style={{
                                                alignItems: "center",
                                                marginBottom: "10%",
                                                borderWidth: 1,
                                                backgroundColor: "rgba(255,255,255,0.6)",
                                            }}>
                                                <Text style={[styles.label, {fontWeight: "800"}]}
                                                      onPress={() => showDatePicker()}
                                                >
                                                    {dayOfBirthday}
                                                </Text>
                                                <DateTimePickerModal
                                                    isVisible={isDatePickerVisible}
                                                    mode="date"
                                                    onConfirm={handleDateConfirm}
                                                    onCancel={hideDatePicker}
                                                    data={dayOfBirthday}
                                                />
                                            </View>

                                        </ScrollView>

                                        <Button title={"Register"}
                                                color={'#000'}
                                                paddingVertical={7}
                                                titleStyle={{fontSize: 18}}
                                                onPress={() => {
                                                    props.handleSubmit()
                                                }}/>
                                        <View style={styles.wrapperGoTo}>
                                            <Text style={[styles.label, {fontSize: 24}]}>
                                                Already have an account ?
                                            </Text>
                                            <Button title={"Go To Login"}
                                                    color={'#000'}
                                                    paddingVertical={7}
                                                    titleStyle={{fontSize: 18}}
                                                    onPress={() => navigation.navigate('Login')}/>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    );
});

const styles = screenStyle

export default observer(RegisterScreen);
