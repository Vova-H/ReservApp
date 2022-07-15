import {Pressable, Text, StyleSheet} from "react-native";

export default function MyButton(props) {
    const {
        onPress,
        textColor = 'white', fz = 16,
        title = 'Button',
        bgColor = 'black',
        pv = 12, ph = 32,
        mgv = 0, mgh = 0,
        mgb = 0, mgt = 0,
        mgr = 0, mgl = 0,
    } = props;


    return (
        <Pressable style={[styles.button, {
            marginVertical: mgv,
            marginHorizontal: mgh,
            paddingHorizontal: ph,
            paddingVertical: pv,
            backgroundColor: bgColor,
            marginBottom: mgb,
            marginTop: mgt,
            marginRight: mgr,
            marginLeft: mgl,
        }]}
                   onPress={onPress}>
            <Text style={[styles.text, {color: textColor, fontSize: fz}]}>{title}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
});
