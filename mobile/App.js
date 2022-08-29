import {QueryClient, QueryClientProvider} from "react-query";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import 'localstorage-polyfill';
import MyReservationsScreen from "./screens/MyReservationsScreen";
import {Button} from "@react-native-material/core";
import CreatingScreen from "./screens/CreatingScreen";


export default function App() {

    const queryClient = new QueryClient()
    const Stack = createNativeStackNavigator();

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="MyReservations" component={MyReservationsScreen}/>
                    <Stack.Screen name="Creating" component={CreatingScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

