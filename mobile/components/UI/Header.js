import React from 'react';
import {StatusBar, Text, TouchableOpacity} from "react-native";
import {AppBar, Button} from "@react-native-material/core";
import authStore from "../../storage/authStore";
import AuthStore from "../../storage/authStore";
import {runInAction} from "mobx";
import reservationStore from "../../storage/reservationStore";
import {useNavigation} from "@react-navigation/native";

const Header = ({title}) => {
    const navigation = useNavigation()
    return (
        <>
            <StatusBar hidden/>
            <AppBar
                title={title}
                subtitle={
                    AuthStore.isAdmin ?
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Admin")
                        }}>
                            <Text style={{color: "white"}}>{authStore.client.email} (Admin)</Text>
                        </TouchableOpacity> :
                        <Text style={{color: "white"}}>{authStore.client.email}</Text>
                }
                trailing={props =>
                    <Button
                        variant="text"
                        title="Logout"
                        compact
                        style={{marginEnd: 4}}
                        onPress={() => {
                            authStore.logout()
                            runInAction(() =>
                                reservationStore.reservations = []
                            )

                            navigation.navigate("Login")
                        }}
                        {...props}
                    />
                }
            />
        </>
    );
};

export default Header;
