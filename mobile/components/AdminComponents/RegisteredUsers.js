import React from 'react';
import {Flex} from "@react-native-material/core";
import {FlatList} from "react-native";
import adminStore from "../../storage/adminStore";

const RegisteredUsers = (props) => {
    const {renderAllUsers} = props
    return (
        <Flex items={"center"} justify={"center"} style={{height: "70%"}}>
            <FlatList data={adminStore.allUsers}
                      renderItem={renderAllUsers}
                      keyExtractor={(item) => item.id}
            />
        </Flex>
    );
};

export default RegisteredUsers;
