import React from 'react';
import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Formik} from "formik";
import loginValidationSchema from "../validates/loginValidationSchema";
import screenStyle from "../styles/screenStyle";
import {Button} from "@react-native-material/core";
import {observer} from "mobx-react";
import authStore from "../storage/authStore";
import reservationStore from "../storage/reservationStore";


const LoginScreen = observer(({navigation}) => {

    const login = async (values) => {
        const response = await authStore.login(values)
        if (response[0]) {
            reservationStore.reservations = []
            navigation.navigate('MyReservations')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={require('../assets/background.jpg')}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <KeyboardAvoidingView behavior={"height"} style={styles.wrapper}>
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validationSchema={loginValidationSchema}
                            onSubmit={async (values, actions) => {
                                await login(values)
                                actions.resetForm()
                            }}
                        >
                            {(props) => (
                                <View>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput style={styles.input}
                                               value={props.values.email}
                                               onChangeText={props.handleChange('email')}
                                               keyboardType={"email-address"}
                                               onBlur={props.handleBlur('email')}

                                    ></TextInput>
                                    <Text style={styles.textError}>{props.touched.email && props.errors.email}</Text>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput style={styles.input} value={props.values.password}
                                               onChangeText={props.handleChange('password')}
                                               textContentType={"password"}
                                               secureTextEntry={true}
                                               onBlur={props.handleBlur('password')}
                                    ></TextInput>
                                    <Text
                                        style={styles.textError}>{props.touched.password && props.errors.password}</Text>
                                    <Button title={"Login"}
                                            color={'#000'}
                                            paddingVertical={7}
                                            titleStyle={{fontSize: 18}}
                                            onPress={() => {
                                                props.handleSubmit()
                                            }}/>
                                    <View style={styles.wrapperGoTo}>
                                        <Text style={[styles.label, {fontSize: 24}]}>Don't have an account yet?</Text>
                                        <Button title={" Go To Register"}
                                                color={'#000'}
                                                paddingVertical={7}
                                                titleStyle={{fontSize: 18}}
                                                onPress={() => navigation.navigate('Register')}/>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    );
})

const styles = screenStyle

export default LoginScreen;
