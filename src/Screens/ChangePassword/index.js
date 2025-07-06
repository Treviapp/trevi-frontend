import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';

// Libraries
import { StackActions } from '@react-navigation/native';
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
import Loader from '../../Components/Loader';

// API Endpoints
import { changePasswordApi, signInAPI } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = ({ navigation }) => {

    const {currentUser} = useSelector(state=>state.userSession)

    const dispatch = useDispatch()
    
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentShowPassword, setCurrentShowPassword] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    

    const onChangePress = async () => {
        setLoading(true)
        try {

            let formData = new FormData()

            formData.append('current_password', currentPassword)
            formData.append('new_password', newPassword)
            formData.append('confirm_password', confirmPassword)
            const response = await changePasswordApi(formData)
            if (response.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log('error==>>', error.response.data.error.message)
            Toast.show(error.response.data.error.message)
        } finally{
            setLoading(false)
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
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <KeyboardAwareScrollView style={Style.bottomContainer}>

                        <View style={Style.bottomInnerainContainer}>
                            <Text style={Style.mainHeading}>
                                {"Change Password"}
                            </Text>
                            <CustomInput
                                mainContainer={{
                                    width: '90%'
                                }}
                                placeholder={"Current Password"}
                                value={currentPassword}
                                secureTextEntry={currentShowPassword}
                                onChangeText={(text) => setCurrentPassword(text)}
                                source={currentShowPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                onPress={() => {
                                    setCurrentShowPassword(!currentShowPassword)
                                }}
                            />
                            <CustomInput
                                mainContainer={{
                                    width: '90%'
                                }}
                                placeholder={"New Password"}
                                secureTextEntry={showPassword}
                                value={newPassword}
                                onChangeText={(text) => setNewPassword(text)
                                }
                                source={showPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                onPress={() => {
                                    setShowPassword(!showPassword)
                                }}
                            />
                            <CustomInput
                                mainContainer={{
                                    width: '90%'
                                }}
                                placeholder={"Confirm Password"}
                                secureTextEntry={showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)
                                }
                                source={showConfirmPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                onPress={() => {
                                    setShowConfirmPassword(!showConfirmPassword)
                                }}
                            />
                            <CustomButton
                                mainButtonStyle={[Style.loginButtonStyle, {
                                    backgroundColor: currentPassword.length > 0 && confirmPassword.length > 0 ? Colors.blue : 'transparent'
                                }]}
                                btnTextStyle={[Style.loginButtonTextStyle, {
                                    color: currentPassword.length > 0 && confirmPassword.length > 0 ? Colors.white : Colors.blue
                                }]}
                                label={"CHANGE"}
                                onPress={() =>
                                    // navigation.dispatch(StackActions.replace('AppStack'))
                                    onChangePress()
                                }
                            />
                        </View>


                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default ChangePassword;

