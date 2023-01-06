import {StyleSheet} from "react-native";

const screenStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: "60%",
    },
    label: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "600",
        marginBottom: 5,
        letterSpacing: 1
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.6)",
        width: "100%",
        alignSelf:"center",
        borderWidth: 1,
        padding: 5,
        fontSize: 20,
    },
    textError: {
        textAlign: "center",
        fontSize: 16,
        color: 'red',
        marginBottom: 10
    },
    wrapperGoTo: {
        marginTop: "10%",
    }

})

export default screenStyle
