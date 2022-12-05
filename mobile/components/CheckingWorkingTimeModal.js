import React from 'react';
import {Flex, Icon, IconButton} from "@react-native-material/core";
import {Modal, StyleSheet, Text} from "react-native";
import reservationStore from "../storage/reservationStore";

const CheckingWorkingTimeModal = ({isAvailableTime, setIsAvailableTime, renderWorkingTime}) => {
    return (
        <Modal transparent={true} animationType={"slide"} visible={isAvailableTime}>
            <Flex style={styles.modalContainer}>
                <Flex style={styles.modalSubContainer}>
                    <Flex style={styles.closeContentWrapper}>
                        <Text style={styles.closeButton}>Working Time</Text>
                        <IconButton
                            onPress={() => {
                                setIsAvailableTime(!isAvailableTime)
                            }}
                            icon={props => <Icon name="close" {...props} color="#5B798FFF"/>}
                        />
                    </Flex>
                    <Flex style={styles.modalContentWrapper}>
                        {
                            reservationStore?.availableTimes?.map((el, index) => {
                                return renderWorkingTime({el, index})
                            })
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalSubContainer: {
        width: "90%",
        height: "88%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContentWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        justifyContent: "center",
    },

    closeContentWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10

    },

    closeButton: {
        fontSize: 20,
    },

})

export default CheckingWorkingTimeModal;
