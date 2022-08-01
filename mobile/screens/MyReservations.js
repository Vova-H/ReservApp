import React from 'react';
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import axios from "axios";
import {useQuery} from "react-query";
import {AppBar, Button, Flex} from "@react-native-material/core";


const MyReservations = ({navigation}) => {

    const array = [
        // {
        //     id: 1,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 2,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 3,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 4,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 5,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 6,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 7,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 8,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 9,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 10,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // },
        // {
        //     id: 11,
        //     action: 'asd',
        //     date: "12 21 12",
        //     time: "11:00"
        // }
    ]

    const fetchReservations = async () => { ///TODO перенести фетч в http
        try {
            const reservationsData = await axios.get('http://10.0.2.2:5000/api/reservation', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            return reservationsData.data
        } catch (e) {
            switch (e.response.status) {
                case 404 :
                    alert('Page not found')
                    break;
                case 403:
                    alert('Access forbidden')
                    break
            }
            navigation.navigate('Login')
        }
    }

    const {data} = useQuery('reservations', fetchReservations)


    const renderReservations = ({item}) => (
        <Flex direction={"row"} items={"center"} justify={"space-between"}
              style={{marginBottom: 20, marginTop: 20, backgroundColor: "blue"}}>
            <Flex justify={"center"} style={{backgroundColor: "red"}}>
                <Text style={{textAlign: "center"}}>{item.time}</Text>
                <Text>{item.date}</Text>
            </Flex>
            <Flex direction={"row"}><Text>{item.action}</Text></Flex>
        </Flex>
    )

    return (
        <Flex fill>
            <AppBar title='MyReservations'/>
            <Flex fill items={"center"} justify={"center"}>
                {
                    data?.length === 0 ?
                        <Text style={{marginBottom: 20}}> You don't have any reservations </Text> :
                        data ? <FlatList data={data} renderItem={renderReservations}
                                         keyExtractor={item => item.id}/> : null
                }
            </Flex>
            <Flex>
                <Button title={"Create"}/>
            </Flex>
        </Flex>
    );
};


export default MyReservations;
