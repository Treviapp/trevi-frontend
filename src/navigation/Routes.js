import React from 'react';

// Libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Stacks
import AuthStack from './AuthStack';
import AppStack from './AppStack';

// Screens
import Splash from '../Screens/Splash';
import Carousal from '../Screens/Carousal';

// Redux Imports
import { useSelector } from 'react-redux';
import { isReadyRef, navigationRef } from './LinkingNavigator';

const Stack = createNativeStackNavigator()

const Routes = () => {

    const { isSignedIn = false } = useSelector(state => state.userSession)
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }} >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Carousal" component={Carousal} />

                {isSignedIn ?
                    <Stack.Screen name='AfterSplash' component={AppStack} />
                    :
                    <Stack.Screen name='AfterSplash' component={AuthStack} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
