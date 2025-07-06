import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

// Libraries
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors'


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

//APi endpoints
import { forgotPasswordAPI } from '../../api/methods/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = ({ navigation }) => {

    const [emailNumber, setEmailNumber] = useState('')
    const [loading, setLoading] = useState(false)

    // To Check Input Fields
    const inputcheck = async () => {
        if (emailNumber === "") {
            Toast.show("Email is required!")
        }
        else {
            forgotPassword()
        }
    };


    const forgotPassword = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("email", emailNumber)
            const response = await forgotPasswordAPI(formData)
            console.log('fogot api response==>>', response.data)
            setLoading(false)
            if (response.status == 200) {
                navigation.navigate('PhoneVerificationScreen', { email: emailNumber })
                Toast.show(response.data.message)
            }
        } catch (error) {
            setLoading(false)
            Toast.show(error.response.data.error.message)
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
                        <View style={Style.bottomContainer}>
                            <KeyboardAwareScrollView>
                            <View style={Style.bottomInnerainContainer}>
                                <Text style={Style.mainHeading}>{"Forgot Password?"}</Text>
                                <Text style={Style.description}>{"Dont't worry. It happens. Please enter the email address associated with your account."}</Text>
                                <CustomInput
                                    placeholder={"Email"}
                                    mainContainer={Style.inputContainer}
                                    value={emailNumber}
                                    onChangeText={(text) => setEmailNumber(text)}
                                />
                                <CustomButton
                                    onPress={() =>
                                        inputcheck()
                                    }
                                    mainButtonStyle={[Style.nextButton, {
                                        backgroundColor: emailNumber.length > 0 ? Colors.blue : 'transparent',
                                        borderColor: Colors.blue,
                                        borderWidth: 0.5
                                    }]}
                                    btnTextStyle={[Style.btnTextStyle, {
                                        color: emailNumber.length > 0 ? Colors.white : Colors.blue
                                    }]}
                                    label={"SUBMIT"}
                                // disabled={}
                                />
                            </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default ForgotPassword;

