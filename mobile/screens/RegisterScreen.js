import React from 'react';
import {
    Alert,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import screenStyle from "../styles/screenStyle";
import {Formik} from "formik";
import registrationValidationSchema from "../validates/registrationValidationSchema";
import {Button} from "@react-native-material/core";
import authStore from "../storage/authStore";
import {observer} from "mobx-react";

const RegisterScreen = (({navigation}) => {


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
                                initialValues={{name: '', surname: '', email: '', password: '', phone: ''}}
                                validationSchema={registrationValidationSchema}
                                onSubmit={async (values, actions) => {
                                    const res = await authStore.registration(values)
                                    Alert.alert("Registration", res.message)
                                    actions.resetForm()
                                    navigation.navigate('Login')
                                }}
                            >
                                {(props) => (
                                    <View>
                                        <Text style={styles.label}>Name</Text>
                                        <TextInput style={styles.input} value={props.values.name}
                                                   onChangeText={props.handleChange('name')}
                                                   onBlur={props.handleBlur('name')}
                                        ></TextInput>
                                        <Text style={styles.textError}>{props.touched.name && props.errors.name}</Text>


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
                                            style={styles.textError}>{props.touched.email && props.errors.email}</Text>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput style={styles.input} value={props.values.password}
                                                   onChangeText={props.handleChange('password')}
                                                   textContentType={"password"}
                                                   secureTextEntry={true}
                                                   onBlur={props.handleBlur('password')}
                                        ></TextInput>
                                        <Text
                                            style={styles.textError}>{props.touched.password && props.errors.password}</Text>
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
