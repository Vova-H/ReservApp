import React from 'react';
import {Flex, Icon, IconButton} from "@react-native-material/core";
import {Modal, StyleSheet, Text} from "react-native";

const InfoClientModal = ({isClientInfo, setIsClientInfo, item}) => {
    let gender;
    item.user.genderId === 1 ? gender = "Female" : gender = "Male"

    const age = new Date().getFullYear() - new Date(item.user.birthday).getFullYear()


    return (
        <Modal transparent={true} animationType={"slide"} visible={isClientInfo}>
            <Flex style={styles.modalContainer}>
                <Flex style={styles.modalSubContainer}>
                    <Flex style={styles.closeContentWrapper}>
                        <Text style={styles.closeButton}>Client Information</Text>
                        <IconButton
                            onPress={() => {
                                setIsClientInfo(!isClientInfo)
                            }}
                            icon={props => <Icon name="close" {...props} color="#5B798FFF"/>}
                        />
                    </Flex>
                    <Flex style={styles.modalContentWrapper}>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Name: </Text>
                            <Text style={styles.clientInfoItem}>{item.user.name}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Surname: </Text>
                            <Text style={styles.clientInfoItem}>{item.user.surname}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Birthday: </Text>
                            <Text style={styles.clientInfoItem}>{item.user.birthday}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Age: </Text>
                            <Text style={styles.clientInfoItem}>{age}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Gender: </Text>
                            <Text style={styles.clientInfoItem}>{gender}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Email: </Text>
                            <Text style={styles.clientInfoItem}>{item.user.email}</Text>
                        </Flex>
                        <Flex style={styles.clientInfoItemsWrapper}>
                            <Text style={styles.clientInfoItemLabel}>Phone Number: </Text>
                            <Text style={styles.clientInfoItem}>{item.user.phone}</Text>
                        </Flex>

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
        height: "50%",
        backgroundColor: "white",
        borderRadius: 20,
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
        flexWrap: "wrap",
        height: "100%",
        paddingTop: "10%"
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
    clientInfoItemsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        flexWrap: "wrap",
        paddingHorizontal: 10
    },
    clientInfoItemLabel: {
        fontSize: 20,
        textTransform: "uppercase"
    },
    clientInfoItem: {
        fontSize: 20,
        textDecorationLine: "underline",
    }


})

export default InfoClientModal;
