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
import screenStyle from "../styles/screenStyle";
import {Formik} from "formik";
import registrationValidationSchema from "../validates/registrationValidationSchema";
import {useCreateRegistrationData} from "../http/auth/useAuthData";

const RegisterScreen = ({navigation}) => {

    const {mutate: registerUser} = useCreateRegistrationData()

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={{uri: 'https://media.istockphoto.com/vectors/medicine-and-science-research-background-vector-id516083365'}}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <View style={styles.wrapper}>
                        <KeyboardAvoidingView behavior={"height"}>
                            <Formik
                                initialValues={{name: '', surname: '', email: '', password: ''}}
                                validationSchema={registrationValidationSchema}
                                onSubmit={(values, actions) => {
                                    registerUser(values)
                                    console.log(values)
                                    actions.resetForm()
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
                                        <Text
                                            style={styles.textError}>{props.touched.surname && props.errors.surname}</Text>
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
                                        <MyButton title={"Register"} mgb={30} mgt={20} onPress={() => {
                                            props.handleSubmit()
                                        }}/>
                                        <View style={styles.wrapperGoTo}>
                                            <Text style={[styles.label, {fontSize: 24}]}>Already have an account
                                                ?</Text>
                                            <MyButton title={"Go To Login"} mgb={20} style={styles.btn}
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
};

const styles = screenStyle

export default RegisterScreen;
