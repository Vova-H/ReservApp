import {Alert, BackHandler} from "react-native";
import {useEffect} from "react";

const exitHandler = () => {
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {text: "YES", onPress: () => BackHandler.exitApp()}
            ]);
            return true;
        };

         const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
}

export default exitHandler



