import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native';

// Libraries
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';

//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';

// API endpoints
import { resetUserPasswordAPI } from '../../api/methods/auth';


const ResetPassword = ({ navigation, route }) => {

    const verificationInfo = route?.params?.userData

    const [loading, setLoading] = useState(false)

    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(true)
    const [confirmShowPassword, setConfirmShowPassowrd] = useState(true)

    const onSubmitPress = () => {
        if (newPassword === '') {
            Toast.show('Password Required!')
        }
        else if (newConfirmPassword === '') {
            Toast.show('Confirm Password is required!')
        }
        else if (newPassword !== newConfirmPassword) {
            Toast.show("Password mismatch!")
        }
        else {
            resetPasswordApi()
        }
    }

    const resetPasswordApi = async () => {
        try {
            setLoading(true)

            const formData = new FormData()

            formData.append('email', verificationInfo.email)
            formData.append('otp_number', verificationInfo.otp)
            formData.append('password', newPassword)
            const response = await resetUserPasswordAPI(formData)
            console.log('response===>>', response.data.data);
            if (response.status == 200) {
                Toast.show(response?.data?.message)
                navigation.navigate('LoginScreen')
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error===>>", error?.response?.data?.error)
            Toast.show(error?.response?.data?.error?.message)
        }
    }

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            headerStyle={Style.headerStyle}
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <KeyboardAwareScrollView style={Style.bottomContainer}>
                        <View style={Style.bottomInnerainContainer}>
                            <Text style={Style.mainHeading}>{"Reset Password"}</Text>
                            <View style={{
                                width: '100%',
                                marginTop: '5%',
                            }}>
                                <CustomInput
                                    placeholder={"New Password"}
                                    mainContainer={Style.inputContainer}
                                    source={showPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                    secureTextEntry={showPassword}
                                    value={newPassword}
                                    onChangeText={(text) => setNewPassword(text)}
                                    onPress={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                />
                                <CustomInput
                                    placeholder={"Confirm Password"}
                                    mainContainer={Style.inputContainer}
                                    source={confirmShowPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                    secureTextEntry={confirmShowPassword}
                                    value={newConfirmPassword}
                                    onChangeText={(text) => setNewConfirmPassword(text)}
                                    onPress={() => {
                                        setConfirmShowPassowrd(!confirmShowPassword)
                                    }}
                                />
                                <CustomButton
                                    onPress={() =>
                                        // navigation.navigate('PhoneVerificationScreen')
                                        onSubmitPress()
                                    }
                                    mainButtonStyle={[Style.nextButton, {
                                        backgroundColor: newPassword.length > 0 && newConfirmPassword.length > 0 ? Colors.blue : 'transparent',
                                        borderColor: Colors.blue,
                                        borderWidth: 0.5
                                    }]}
                                    btnTextStyle={[Style.btnTextStyle, {
                                        color: newPassword.length > 0 && newConfirmPassword.length > 0 ? Colors.white : Colors.blue
                                    }]}
                                    label={"SUBMIT"}
                                // disabled={}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <Loader loading={loading} isShowIndicator={true} />
            </ImageBackground>
        </View>
    )
}

export default ResetPassword;

