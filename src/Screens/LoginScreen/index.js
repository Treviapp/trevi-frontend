import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    Keyboard,
    
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import crashlytics from '@react-native-firebase/crashlytics';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

// API Endpoints
import { signInAPI } from '../../api/methods/auth';

// Redux Imports
import { signInResponse, StoreFcmToke, isNewUSer } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const [fcmTokenState, setFcmTokenState] = useState('')

    useEffect(() => {
        requestUserPermission()
    }, [])

    const onLoginPress = async () => {
        try {
            setLoading(true)
            let formData = new FormData()
            formData.append('role', 'customer')
            formData.append('email', email)
            formData.append('password', password)
            formData.append('certification_type', 'development')
            formData.append('device_id', fcmTokenState)
            console.log("formData==>>", formData)
            const response = await signInAPI(formData)
            console.log("Authentication_token", response.data.access_token)
            if (response.status == 200) {
                dispatch(signInResponse({
                    token: response.data.access_token,
                    userData: response.data
                }))
                Toast.show("Sign in Success")
            }
            setLoading(false)
        } catch (error) {
            console.log('error==>>', error.response.data.error.message)
            if (error.response.data.error.message === 'Your email is not verified.')
                navigation.navigate('PhoneVerificationScreen', {
                    email: email,
                    unverifiedUser: true
                })
            setLoading(false)
            Toast.show(error?.response?.data?.error?.message)
        }
    }

    const requestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const fcmToken = await messaging().getToken()
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log("requestUserPermission-fcmToken", fcmToken);
                setFcmTokenState(fcmToken)
                dispatch(StoreFcmToke(fcmToken))
            }
        } catch (error) {
            console.log("permission error===>>>", error);
        }
    }




    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"handled"}>
                            <View style={Style.bottomInnerainContainer}>
                                <Text style={Style.mainHeading}>
                                    {"Login to continue"}
                                </Text>
                                <CustomInput
                                    mainContainer={{
                                        width: '90%',
                                        height: 50
                                    }}
                                    placeholder={"EMAIL"}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <CustomInput
                                    mainContainer={{
                                        width: '90%',
                                        height: 50
                                    }}
                                    placeholder={"PASSWORD"}
                                    secureTextEntry={showPassword}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)
                                    }
                                    source={showPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                    onPress={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                >
                                    <Text style={Style.forgotPasswordStyle}>{"Forgot Password?"}</Text>
                                </TouchableOpacity>

                                <CustomButton
                                    mainButtonStyle={[Style.loginButtonStyle, {
                                        backgroundColor: email.length > 0 && password.length > 0 ? Colors.blue : 'transparent'
                                    }]}
                                    btnTextStyle={[Style.loginButtonTextStyle, {
                                        color: email.length > 0 && password.length > 0 ? Colors.white : Colors.blue
                                    }]}
                                    label={"LOGIN"}
                                    onPress={() => {
                                        // navigation.dispatch(StackActions.replace('AppStack'))
                                        Keyboard.dismiss()
                                        onLoginPress()
                                    }}

                                    disabled={email.length > 0 && password.length > 0 ? false : true}
                                />


                                <View style={Style.rowContainer}>
                                    <Text style={Style.newToSkollStyle}>{"New to Skoll? "}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                                        <Text style={Style.signUpButtonStyle}>{"Sign up"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default LoginScreen;

