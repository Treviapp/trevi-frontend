import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LandingScreen from "../Screens/LandingScreen";
import LoginScreen from "../Screens/LoginScreen"
import ForgotPassword from "../Screens/ForgotPassword";
import ResetPassword from "../Screens/ResetPassword";
import SignUpScreen from "../Screens/SignUpScreen";
import VerificationScreen from "../Screens/VerificationScreen";
import PhoneVerificationScreen from "../Screens/PhoneVerificationScreen";
import VerifyEmail from "../Screens/VerifyEmail";
import PrivacyPolicy from "../Screens/PrivacyPolicy";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='LandingScreen' component={LandingScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
            <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
            <Stack.Screen name='PhoneVerificationScreen' component={PhoneVerificationScreen} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        </Stack.Navigator>
    )
}

export default AuthStack;
