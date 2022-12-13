import React from 'react';
import {Flex} from "@react-native-material/core";
import {FlatList} from "react-native";
import adminStore from "../../storage/adminStore";

const AllReservations = (props) => {
    const {renderAllReservations}= props
    return (
        <Flex items={"center"} justify={"center"} style={{height: "70%"}}>
            <FlatList data={adminStore.allReservations}
                      renderItem={renderAllReservations}
                      keyExtractor={(item) => item.id}
            />
        </Flex>
    );
};

export default AllReservations;
