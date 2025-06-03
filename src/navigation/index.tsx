import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import * as ScreenRegistry from './screenRegistry';
import Colors from "../theme/colors";

const Stack = createStackNavigator();

const Navigation = () => {
    const screens = Object.values(ScreenRegistry.screens);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    title: "Couple Hub",
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: Colors.title,
                        fontWeight: 'bold',
                    },
                    headerShown:false,
                    headerTintColor: Colors.title,
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                }}/>
                {screens.map((screen) => (
                    <Stack.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                        options={{
                            title: screen.title, headerStyle: {
                                elevation: 0,
                                shadowOpacity: 0,
                                backgroundColor: 'transparent',
                            },
                            headerTitleStyle: {
                                color: Colors.title,
                                fontWeight: 'bold',
                            },
                            headerTintColor: Colors.title,
                            headerTransparent: true,
                            headerTitleAlign: 'center'
                        }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
