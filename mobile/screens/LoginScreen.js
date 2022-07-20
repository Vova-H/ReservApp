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
import MyButton from "../components/MyButton";
import {Formik} from "formik";
import loginValidationSchema from "../validates/loginValidationSchema";
import screenStyle from "../styles/screenStyle";
import {useLogin} from "../http/auth/useAuthData";


const LoginScreen = ({navigation}) => {

    const {mutate: loginUser} = useLogin()

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={{uri: 'https://media.istockphoto.com/vectors/medicine-and-science-research-background-vector-id516083365'}}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <KeyboardAvoidingView behavior={"height"} style={styles.wrapper}>
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validationSchema={loginValidationSchema}
                            onSubmit={(values, actions) => {
                                loginUser(values)
                                navigation.navigate("MyReservations")
                                console.log(values)
                                actions.resetForm()
                            }}
                        >
                            {(props) => (
                                <View>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput style={styles.input} value={props.values.email}
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
                                    <MyButton title={"Login"} mgb={30} mgt={20} onPress={() => {
                                        props.handleSubmit()
                                    }}/>
                                    <View style={styles.wrapperGoTo}>
                                        <Text style={[styles.label, {fontSize: 24}]}>Don't have an account yet?</Text>
                                        <MyButton title={" Go To Register"} mgb={20} style={styles.btn}
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
};

const styles = screenStyle

export default LoginScreen;
