import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import MyReservationsScreen from "./screens/MyReservationsScreen";
import {IconComponentProvider} from "@react-native-material/core";
import CreatingScreen from "./screens/CreatingReservationScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import UpdatingReservationScreen from "./screens/UpdatingReservationScreen";
import AdminScreen from "./screens/AdminScreen";


export default function App() {

    const Stack = createNativeStackNavigator();
    
    return (
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Register" component={RegisterScreen}/>
                        <Stack.Screen name="MyReservations" component={MyReservationsScreen}/>
                        <Stack.Screen name="Creating" component={CreatingScreen}/>
                        <Stack.Screen name="Editing" component={UpdatingReservationScreen}/>
                        <Stack.Screen name="Admin" component={AdminScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </IconComponentProvider>
    );
}

