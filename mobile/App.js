import {QueryClient, QueryClientProvider} from "react-query";
import LoginScreen from "./screens/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";


export default function App() {

    const queryClient = new QueryClient()
    const Stack = createNativeStackNavigator();

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

